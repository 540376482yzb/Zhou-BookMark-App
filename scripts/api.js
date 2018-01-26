'use strict'

const api = function () {
  const BASE_URL =  'https://thinkful-list-api.herokuapp.com'
  function getItems(callback){
    const endPoint = `${BASE_URL}/zhou/bookmarks`
    $.getJSON(endPoint, callback)
  }

  return{
    getItems
  }
}()