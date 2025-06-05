const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './html/APrices.html': path.resolve(__dirname, 'template/js/components/APrices.html'),
      './js/APrices.js': path.resolve(__dirname, 'template/js/components/APrices.js'),
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/components/TheProduct.html'),
      './html/ProductGallery.html': path.resolve(__dirname, 'template/js/components/ProductGallery.html'),
      './js/DiscountApplier.js': path.resolve(__dirname, 'template/js/components/DiscountApplier.js'),
      './../lib/fix-item-final-price': path.resolve(__dirname, 'template/js/custom-js/fix-item-final-price.js'),


      './html/ProductCard.html': path.resolve(__dirname, 'template/alpix/html/ProductCard.html'),
      './html/QuantitySelector.html': path.resolve(__dirname, 'template/alpix/html/QuantitySelector.html'),
      './html/CartQuickview.html': path.resolve(__dirname, 'template/alpix/html/CartQuickview.html'),
      './js/ProductGallery.js': path.resolve(__dirname, 'template/alpix/js/ProductGallery.js'),

       './html/SearchEngine.html': path.resolve(__dirname, 'template/alpix/html/SearchEngine.html'),
      './js/SearchEngine.js': path.resolve(__dirname, 'template/alpix/js/SearchEngine.js'),
      './js/ProductCard.js': path.resolve(__dirname, 'template/alpix/js/ProductCard.js'),
      // '../../storefront-twbs/scss/_reboot.scss': path.resolve(__dirname, 'template/alpix/reboot.scss'),
    }
  }
})
