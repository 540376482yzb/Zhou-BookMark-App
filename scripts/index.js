'use strict'
/*global mockData, store, api, modelView */
function init(){
  
  api.getItems( bookmarks => {
    bookmarks.forEach( bookmark => store.addItem(bookmark))
    store.setCurrentItem({})
    // render page and register event listeners
    modelView.renderSideBar()
    modelView.renderDetail()
    modelView.renderForm()
    modelView.handleEvents()
  })
  
}
$(document).ready( () => {
  init()
} 
)

