import {
  i19add,
  i19seeMore,
  i19weRecommendToYou
} from '@ecomplus/i18n'

import {
  i18n,
  recommendedIds as getRecommendedIds,
  formatMoney
} from '@ecomplus/utils'

import { graphs } from '@ecomplus/client'
import EcomSearch from '@ecomplus/search-engine'
import ecomCart from '@ecomplus/shopping-cart'
import { isMobile } from '@ecomplus/storefront-twbs'
import addIdleCallback from '@ecomplus/storefront-components/src/js/helpers/add-idle-callback'
import ProductCard from '@ecomplus/storefront-components/src/ProductCard.vue'
import { toggleFavorite } from '@ecomplus/storefront-components/src/js/helpers/favorite-products'
import ecomPassport from '@ecomplus/passport-client'
export default {
  name: 'RecommendedItems',

  components: {
    ProductCard
  },

  props: {
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    },
    pageSize: {
      type: Number,
      default: 99
    },
    sortOrder: {
      type: String,
      default: 'sales'
    },
    listType:{
      type: String,
      default: 'normal'
    },
    canLoadMore: {
      type: Boolean,
      default: true
    },
    rowClassName: {
      type: String,
      default: 'row no-gutters'
    },
    colClassName: {
      type: String,
      default: 'col-6 col-md-4 col-lg-3'
    },
    productCardProps: {
      type: Object,
      default () {
        return {
          isSmall: true,
          buyText: i18n(i19add),
          installmentsOption: {},
          discountOption: {}
        }
      }
    },
    ecomCart: {
      type: Object,
      default () {
        return ecomCart
      }
    },
    productIds: {
      type: Array,
      default () {
        return []
      }
    },
    defaultMatchType: {
      type: String,
      default: (typeof window === 'object' && window.ecomRecommendationsType) || 'recommended'
    }
  },

  data () {
    return {
      ecomSearch: new EcomSearch()
        .mergeFilter({
          range: {
            quantity: {
              gt: 0
            }
          }
        })
        .mergeFilter({
          term: {
            available: true
          }
        }),
      pageNumber: 1,
      items: []
    }
  },

  computed: {
    i19seeMore: () => i18n(i19seeMore),
    i19weRecommendToYou: () => i18n(i19weRecommendToYou)
  },

  methods: {
    
    async toggleFavorite (itemId) {
      console.log('toggleFavorite', itemId)      
        this.isFavorite = await toggleFavorite(itemId, this.ecomPassport)              
        this.items = this.items.filter(item => item._id !== itemId)      
    },
    formatMoney,
    fetchItems () {
      delete this.ecomSearch.dsl.aggs
      this.ecomSearch.setPageNumber(this.pageNumber).fetch().then(() => {
        this.items = this.items.concat(this.ecomSearch.getItems())
        this.totalCount = this.ecomSearch.getTotalCount()
        if (this.totalCount) {
          this.$emit('recommend-items', {
            items: this.items,
            totalCount: this.totalCount
          })
        }
      }).finally(() => {
        this.$emit('fetched')
      })
    }
  },

  created () {
    
    const fetchRecommendations = (matchType = this.defaultMatchType) => {
      const promises = []
      const items = this.ecomCart.data.items.sort((a, b) => a.quantity > b.quantity ? -1 : 1)
      for (let i = 0; i < items.length && i <= 4; i++) {
        promises.push(graphs({ url: `/products/${items[i].product_id}/${matchType}.json` }))
      }
      Promise.allSettled(promises).then(results => {
        const productIds = []
        results.forEach(({ status, value }) => {
          if (status === 'fulfilled') {
            getRecommendedIds(value.data).forEach(productId => {
              if (
                !productIds.includes(productId) &&
                !this.ecomCart.data.items.find(item => item.product_id === productId)
              ) {
                productIds.push(productId)
              }
            })
          }
        })
        if (productIds.length) {
          this.ecomSearch.setProductIds(productIds.slice(0, 24))
          this.fetchItems()
        } else if (matchType === 'recommended') {
          fetchRecommendations('related')
        }
      })
    }
    if (this.productIds.length) {
      this.ecomSearch.setProductIds(this.productIds)
      this.totalCount = this.items.length
      this.fetchItems()
    } else {
      addIdleCallback(() => {
        fetchRecommendations()
      })
    }
  },

  watch: {
    pageSize: {
      handler (pageSize) {
        this.ecomSearch.setPageSize(pageSize)
      },
      immediate: true
    },

    sortOrder: {
      handler (sortOrder) {
        this.ecomSearch.setSortOrder(sortOrder)
      },
      immediate: true
    },

    pageNumber () {
      this.fetchItems()
    }
  }
}