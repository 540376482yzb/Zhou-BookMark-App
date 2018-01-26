'use strict'
/* global store,cuid,api */
const modelView = function () { 

  function renderSideBar() {
    const items = store.getItems().filter(item => {
      return item.rating >= store.minStar
    })
    const sideLists = generateListGroup(items)
    $('.book-mark-lists').html(sideLists)
  }

  function renderDetail() {
    const page = generateDetail()
    $('.card-container').html(page)

  }

  function renderForm(){
    if(store.edit){
      $('.form-create').removeClass('hidden')
      $('.overlay, .overlay-message').show();
    }
    else{
      // $('.form-create').addClass('hidden');
      $('.overlay, .overlay-message').hide();
    }
  }
  //======= generate page for detail view ==============================
  function generateDetail() {
    if ($.isEmptyObject(store.getCurrentItem())) {
      store.setCurrentItem(store.getItems()[0])
    }
    const colorPicker = generateRandomColor()
    const item = store.getCurrentItem()
    if (item) {
      let shortTitle = item.title
      if(item.title.length > 18){
        shortTitle = item.title.substring(0,18)+'...'
      }
      return `<div class="card-header-color ${colorPicker}">
                  <!-- random background color -->
                </div>
                <div class="card-body">
                  <a target="_blank" href="${item.url}" class="card-title">${shortTitle}</a>
                  <a href="#" class='btn btn-delete' id= ${item.id}>DELETE</a>
                  <div class="card-description">
                    ${item.desc}
                  </div>
            </div>`
    }
    return ''
  }
  function generateRandomColor() {
    const color = ['green', 'orange', 'blue', 'yellow', 'pink', 'black']
    const pickOne = Math.floor(Math.random() * 6) // 0 - 5
    return color[pickOne]
  }
  //======= generate page for sidebar====================================
  function generateListGroup(items) {
    const pageTemplate = []
    items.forEach(item => {
      pageTemplate.push(generateList(item))
    })
    return pageTemplate
  }
  function generateList(item) {

    return `<li class='book-mark' id= ${item.id}>
    <div class='book-mark-title'>${item.title}</div>
    <div class='book-mark-description'>
      ${item.shortDesc}
    </div>
    <div class='book-mark-rating'>${item.ratingStar}</div>
  </li>`
  }

  //==========================================================


  //============= handle create book mark event ==============
  function handleCreate(){
    $('.add-btn').on('click', e => {
      store.edit = true
      renderForm()
    })
  }
  //============= handle side bar click list event ===========
  function handleClickList() {
    $('.book-mark-lists').on('click', '.book-mark', (e) => {

      const foundId = $(e.currentTarget).attr('id')
      const foundItem = store.getItem(foundId)
      store.setCurrentItem(foundItem)
      // set book-mark-list item to active
      $('.book-mark').removeClass('active')
      $(`#${foundId}`).addClass('active')
      renderDetail()
    })
  }
  //============= handle filter =============================
  function handleFilter() {
    $('#filter-rating').on('change', e => {
      let rating = $(e.target).val()
      store.minStar = rating
      renderSideBar()
    })
  }
  //============ handle delete event ========================
  function handleDelete() {
    $('.card-container').on('click', '.btn-delete', e => {
      const foundId = $(e.currentTarget).attr('id')
      api.deleteItem(foundId, ()=> {
        console.log('delete')
        store.deleteItem(foundId)
        store.setCurrentItem({})
        renderSideBar()
        renderDetail()

      })
    })

  }
  //================= handle form submit =====================
  function handleFormSubmit(){
    $('.form-create').submit( event => {
      event.preventDefault()
      const title = $(event.currentTarget).find('.form-title').val()
      const url = $(event.currentTarget).find('.form-url').val()
      const rating = Number($(event.currentTarget).find('.form-rating').val())
      const desc = $(event.currentTarget).find('.form-desc-textarea').val()
      const item = {id:cuid(),title,url,rating,desc}
      
      api.addItem(item, () => {
        store.addItem(item)
        store.edit = false;
        $('.form-create')[0].reset()
        renderForm();
        renderSideBar();
      })
    })

    $('.form-create').on('click','.cancel-btn', e=> {
      store.edit = false;
      $('.form-create')[0].reset()
      renderForm();
    })
  }


  function handleEvents() {
    handleClickList()
    handleFilter()
    handleDelete()
    handleCreate()
    handleFormSubmit()
  }

  return {
    renderSideBar,
    handleEvents,
    renderDetail,
    renderForm
  }
}()