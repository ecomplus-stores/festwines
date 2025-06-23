
const { toggleFavorite, checkFavorite } = require('@ecomplus/storefront-components/src/js/helpers/favorite-products');
const search = new EcomSearch()
const EcomPassport = require('@ecomplus/passport-client');
const client = EcomPassport.ecomPassport.getCustomer();   


$(`body`).on(`click`,`[href="/app/#/account/favorites"], #favorites-toggle`,function(e){
  e.preventDefault();  
  //let client = EcomPassport.ecomPassport.getCustomer();   
  if(!client.display_name){
    window.location.href = "/app/#/account/";
    return false
  }
  placeFavorites();
  $(`#favorites-quickview`).show()
});
$(`body`).on(`click`,`#favorites-quickview .close`,function(e){
  e.preventDefault();
  $(`#favorites-quickview`).hide()
});

$(document).ready(function(){
  
});

window.messageBullet = function(message) {
  const container = document.getElementById('message-container');
  
  // Create a new div for the message
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = message;
  
  // Append the new message to the container
  container.appendChild(messageElement);
  
  // Trigger fadeIn effect
  setTimeout(() => {
    messageElement.classList.add('fade-in');
  }, 10);  // Small delay to allow the DOM to update

  // Wait 3 seconds, then trigger fadeOut
  setTimeout(() => {
    messageElement.classList.remove('fade-in');
    messageElement.classList.add('fade-out');
    
    // Remove the message element after fadeOut transition (500ms)
    setTimeout(() => {
      messageElement.remove();
    }, 500);
  }, 3000);
}

syncFavorites();
placeFavorites();



async function placeFavorites(){  
  $(`.favorites__body`).html('<p class="h5 d-block m-3 text-center">Carregando...</p>');
  
  try {
    let favoriteList = []
    if(client.display_name){
      const { favorites } = await EcomPassport.ecomPassport.getCustomer();  
      favoriteList = favorites  
      console.log('placeFavorites - logged in')
      console.log(favoriteList)
    }else{
      let localFavorites = localStorage.getItem(`apxLocalFavorites`)
      if(localFavorites){
        localFavorites = JSON.parse(localFavorites)
        favoriteList = localFavorites
        console.log('placeFavorites - logged out')
      }
    }
    //console.log('favoriteList',favoriteList,favoriteList.length > 0)
    if(favoriteList && favoriteList.length > 0){
      search.setProductIds(favoriteList).fetch().then(result => {
        console.log('favorite-search place',result)
        $(`.favorites__body`).empty()
        $.each(result.hits.hits, function(k,i){
          let item = i._source;        
          $(`<div class="item"><a href=/${item.slug}><img alt="${item.pictures ? item.pictures[0].normal.alt : ''}"src="${item.pictures ? item.pictures[0].normal.url : '/assets/img-placeholder.png'}"><h3 class=product-card__name>${item.name}</h3></a><button type="button" data-product-id=${i._id}><i class="i-trash"></i></button></div>`).appendTo(`.favorites__body`);
        });  
        
        if(result.hits.hits.length == 0){
          
          $(`.favorites__body`).html('<p class="m-4 text-center h5 font-small d-block">Ops... você não adicionou nenhum produto a sua lista de favoritos</p>');
        }
  
        $(`.favorite-count`).text(result.hits.hits.length)
      })
    }else{
      $(`.favorites__body`).html('<p class="m-4 text-center h5 font-small d-block">Ops... você não adicionou nenhum produto a sua lista de favoritos</p>');
      $(`.favorite-count`).text(0)
    }
    
    
  }catch(e){
    //console.log(e)
    $(`.favorites__body`).html('<p class="h5 d-block m-4 text-center">Ocorreu um erro ao carregar os favoritos :(</p>');
    $(`#favorites-toggle span`).text(`0`)
  }
}

async function syncFavorites(){
  if(client.display_name && localStorage.getItem(`apxLocalFavorites`)){
    const localFavorites = JSON.parse(localStorage.getItem(`apxLocalFavorites`));
    const { favorites } = await EcomPassport.ecomPassport.getCustomer(); 
    const newFavorites = localFavorites.concat(favorites.filter(item => !localFavorites.includes(item)));
    ////console.log('newFavorites',newFavorites)
    EcomPassport.ecomPassport.requestApi('/me.json', 'patch', { favorites: newFavorites }).then(() => {
      localStorage.removeItem(`apxLocalFavorites`)
      console.log('favorite list synced')
    })
    

    placeFavorites();
  }
}



$('body').on('click','#favorites-quickview button[data-product-id]', function(){
  toggleFavorite($(this).data(`product-id`), EcomPassport.ecomPassport)
  $(this).closest(`.item`).remove();
});