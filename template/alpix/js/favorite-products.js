import _ecomPassport from '@ecomplus/passport-client'

const toggleFavorite = (productId, ecomPassport = _ecomPassport) => {  
  
  const customer = ecomPassport.getCustomer()
  const search = new EcomSearch()
  const favorites = customer.favorites || []
  const isFavorite = checkFavorite(productId, ecomPassport)
  console.log('favorite-products',customer.favorites, customer.favorites ? true : false)

  
  if(customer.display_name){
    if (!isFavorite) {
      favorites.push(productId)
      window.messageBullet(`Adicionado aos favoritos`)
    } else {
      const favIndex = favorites.indexOf(productId)
      favorites.splice(favIndex, 1)
      window.messageBullet(`Removido dos favoritos`)
    }
  
    ecomPassport.requestApi('/me.json', 'patch', { favorites })   
    search.setProductIds(favorites).fetch().then(result => {
      $(`.favorite-count`).text(result.hits.hits.length)
    })

    return !isFavorite
  }else{
    let localFavorites = localStorage.getItem(`apxLocalFavorites`)
    if(localFavorites){
      localFavorites = JSON.parse(localFavorites)
    }else{
      localFavorites = []
    }

    if (!isFavorite) {
      localFavorites.push(productId)
      window.messageBullet(`Adicionado aos favoritos`)
    } else {
      const favIndex = localFavorites.indexOf(productId)
      localFavorites.splice(favIndex, 1)
      window.messageBullet(`Removido dos favoritos`)
    }
    localStorage.setItem(`apxLocalFavorites`,JSON.stringify(localFavorites))

    search.setProductIds(localFavorites).fetch().then(result => {
      $(`.favorite-count`).text(result.hits.hits.length)
      console.log('favorite-search',result.hits.hits.length)
      if(result.hits.hits.length == 0){          
          $(`.favorites__body`).html('<p class="m-4 text-center h5 font-small d-block">Ops... você não adicionou nenhum produto a sua lista de favoritos</p>');
      }
    })
    //$(`.favorite-count`).text(localFavorites.length)
    return !isFavorite
  }
  
}
const checkFavorite = (productId, ecomPassport) => {
  const customer = ecomPassport.getCustomer()
  if(customer.display_name){
    const { favorites } = ecomPassport.getCustomer()
    
    return favorites && favorites.includes(productId)
  }else{
    ////console.log('b',productId)

    let localFavorites = localStorage.getItem(`apxLocalFavorites`)
    if(localFavorites == null){
      localFavorites = []
      
    }else{
      localFavorites = JSON.parse(localFavorites)
    }
    
    return localFavorites && localFavorites.includes(productId)
  }  
}

export { toggleFavorite, checkFavorite }