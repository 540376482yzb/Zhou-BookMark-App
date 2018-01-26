'use strict'
/*global mockData, store, api, modelView */
function init(){
  
  // fetch data from server to local store
  mockData.items.forEach( item => {store.addItem(item)})

  // set current display item
  store.setCurrentItem()

  // render page and register event listeners
  modelView.renderSideBar()
  modelView.renderDetail()
  modelView.handleEvents()
  $('.form-create').hide()
}
init()