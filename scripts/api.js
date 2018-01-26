'use strict'

const api = function () {
  const BASE_URL =  'https://thinkful-list-api.herokuapp.com'
  function getItems(callback){
    const endPoint = `${BASE_URL}/zhou/bookmarks`
    $.getJSON(endPoint, callback)
  }

  function addItem(bookmark, callback){
    const endPoint = `${BASE_URL}/zhou/bookmarks`
    const sendData = JSON.stringify(bookmark)
    const settings = {
      url: endPoint,
      method:'POST',
      data:sendData,
      contentType:'application/json',
      success:callback
    }
    $.ajax(settings)
  }

  function deleteItem(id, callback){
    const endPoint = `${BASE_URL}/zhou/bookmarks/${id}`
    const settings = {
      url:endPoint,
      method:'DELETE',
      dataType:'json',
      contentType:'application/json',
      success: callback
    }
    $.ajax(settings)
  }
  return{
    getItems,
    addItem,
    deleteItem
  }
}()