'use strict'
/*global mockData, store, api, modelView */
function init(){
  

  api.getItems( bookmarks => {
    bookmarks.forEach( bookmark => store.addItem(bookmark))
    store.setCurrentItem()

    // render page and register event listeners
    modelView.renderSideBar()
    modelView.renderDetail()
    modelView.renderForm()
    modelView.handleEvents()
  })
  
  // fetch data from server to local store
//   mockData.items.forEach( item => {store.addItem(item)})
// console.log(store.getItems())
  // set current display item
  
}
init()