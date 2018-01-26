'use strict'
/* global*/
const store = function() {
  
  let items = []
  let currentItem = {}
  const minStar = 0
  //================= get items or item ==================================
  function getItems(){
    return items
  }
  function getItem(id){
    return items.find( item => item.id === id)
  }
  function getCurrentItem(){
    return currentItem
  }
  //=================  set current Item ===================================
  
  function setCurrentItem(item){
    currentItem = item
  }
  //=================  add Item ===========================================
 
  function addItem(item){
    const newItem = populateItem(item)
    items.push(newItem) 
  }

  function populateItem(item){
    const newItem = item
    newItem.shortDesc= shortSentence(item)
    switch(item.rating){
    case 1: 
      newItem.ratingStar = '<span>★</span> &nbsp;&nbsp;<span>☆</span>&nbsp;&nbsp;<span>☆</span>&nbsp;&nbsp;<span>☆</span>&nbsp;&nbsp;<span>☆</span>'
      break;
    case 2: 
      newItem.ratingStar = '<span>★</span> &nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>☆</span>&nbsp;&nbsp;<span>☆</span>&nbsp;&nbsp;<span>☆</span>'
      break;
    case 3: 
      newItem.ratingStar = '<span>★</span> &nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>☆</span>&nbsp;&nbsp;<span>☆</span>'
      break;
    case 4: 
      newItem.ratingStar = '<span>★</span> &nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>☆</span>'
      break;
    case 5: 
      newItem.ratingStar = '<span>★</span> &nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>★</span>'
      break;
    }
    newItem.edit = false
    return newItem
  }

  function shortSentence(item){
    if(item.desc.length > 50){
      return item.desc.substring(0,50)+ '...'
    }
    return item.desc

  }
  //=================  delete item =============================
  function deleteItem(id){
    items = items.filter( item => item.id !== id)
  }
  return {
    currentItem,
    minStar,
    addItem,
    getItem,
    getItems,
    getCurrentItem,
    setCurrentItem,
    deleteItem
  }

}()