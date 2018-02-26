'use strict'
/* global store,api */
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
    $('#regist-section').html(generateForm())
  }
  function generateForm(){
    const showForm = store.create || store.edit
    return `
    <div class="overlay ${(showForm)? '':'hidden' }"></div>
    <form class="form-create overlay-message ${(showForm)? '':'hidden' }">
    <div class='form-holder'>
      <div class='form-item'>
        <label for='form-title'class='form-label'>title:</label>
        <input name='form-title' type="text" class='form-title' value="${store.edit? store.getCurrentItem().title :''}">
      </div>
      <div class='form-item'>
        <label for='form-url' class='form-label'>url:</label>
        <input name='form-url' type="text" class='form-url' value="${store.edit? store.getCurrentItem().url :''}">
      </div>
      <div class='form-item'>
        <label for='form-rating' class='form-label'>rating:</label>
        <select name="form-rating" class='form-rating' >
          <option value="1">
            ${generateStars(1)}
          </option>
          <option value="2">
          ${generateStars(2)}

          </option>
          <option value="3">
          ${generateStars(3)}

          </option>
          <option value="4">
          ${generateStars(4)}

          </option>
          <option value="5">
          ${generateStars(5)}
          </option>
        </select>
      </div>
    </div>
    <div class='form-holder'>
      <div class='form-item'>
        <label for='form-desc' class='form-label'>description:</label>
        <textarea name='form-desc' class='form-desc-textarea'>
              ${store.edit? store.getCurrentItem().desc :''}"
        </textarea>
      </div>

      <div class='form-item'>
        <input type='submit' href="#" class="form-btn confirm-btn" value='CONFIRM'>
        <input type='button' class="form-btn cancel-btn" value='CANCEL'>
      </div>
    </div>
  </form>  `
  
  }
  //======= generate page for detail view ==============================
  function generateDetail() {
    const item = store.getCurrentItem()
    if (item) {
      let shortTitle = item.title
      if(item.title.length > 18){
        shortTitle = item.title.substring(0,18)+'...'
      }
      return `<div class="card-header-color black">
                  <!-- random background color -->
                </div>
                <div class="card-body">
                  <h2 class="card-title">${shortTitle}</h2>
                  <div class="card-stars">${generateStars(item.rating)}</div>
                  <a type='button' href="#" class='btn btn-edit' data-id= "${item.id}">EDIT</a>
                  <a type='button' href="#" class='btn btn-delete' data-id= "${item.id}">DELETE</a>
                  <div class="card-description">
                    ${item.desc}
                  </div>
                </div>
                <a role="footer" class="card-footer" href="${item.url}">CLICK TO LEARN MORE</a>`
                
    }
    return ''
  }

  //======= generate page for sidebar====================================
  function generateStars(stars){
    switch(stars){
    case 1: 
      return '<span>★</span> &nbsp;&nbsp;<span>☆</span>&nbsp;&nbsp;<span>☆</span>&nbsp;&nbsp;<span>☆</span>&nbsp;&nbsp;<span>☆</span>'
    case 2: 
      return '<span>★</span> &nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>☆</span>&nbsp;&nbsp;<span>☆</span>&nbsp;&nbsp;<span>☆</span>'
    case 3: 
      return '<span>★</span> &nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>☆</span>&nbsp;&nbsp;<span>☆</span>'
    case 4: 
      return '<span>★</span> &nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>☆</span>'
    case 5: 
      return '<span>★</span> &nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>★</span>&nbsp;&nbsp;<span>★</span>'
    }
  }
  function generateListGroup(items) {
    const pageTemplate = []
    items.forEach(item => {
      pageTemplate.push(generateList(item))
    })
    return pageTemplate
  }

  function generateList(item) {
    let active = ''
    if(store.getCurrentItem()){
      if(store.getCurrentItem().id === item.id){
        active = 'active'
      }
    }
    return `<li 
    class="book-mark ${active}" id="${item.id}">
    <div class='book-mark-title'>${item.title}</div>
    <div class='book-mark-description'>
      ${item.shortDesc}
    </div>
    <div class='book-mark-rating'>${generateStars(item.rating)}</div>
  </li>`
  }
  

  //============= handle create book mark event ==============
  function handleCreate(){
    $('.add-btn').on('click', e => {
      store.create = true
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
      renderSideBar()
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
      const foundId = $(e.currentTarget).attr('data-id')
      api.deleteItem(foundId, ()=> {
        store.deleteItem(foundId)
        store.setCurrentItem(null)
        renderSideBar()
        renderDetail()
      })
    })
  }

  function handleEdit(){
    $('.card-container').on('click','.btn-edit', e=> {
      console.log('edit click')
      store.edit = true
      renderForm()
    })
  }
  //================= handle form submit =====================
  function handleFormSubmit(){
    $('#regist-section').submit('.form-create', event => {
      event.preventDefault()
      const title = $(event.currentTarget).find('.form-title').val()
      const url = $(event.currentTarget).find('.form-url').val()
      const rating = Number($(event.currentTarget).find('.form-rating').val())
      const desc = $(event.currentTarget).find('.form-desc-textarea').val()
      const item = {title,url,rating,desc}
      if(store.create){
        api.addItem(item, (newItem) => {
          store.addItem(newItem)
          store.create = false;
          $('.form-create')[0].reset()
          renderSideBar();
          renderDetail();
          renderForm();
        })
      }else{
        const id = store.getCurrentItem().id
        store.edit = false;
        api.editItem(id, item,(res)=> {
          const foundItem = store.getItem(id)
          Object.assign(foundItem, res)
          renderSideBar();
          renderDetail();
          renderForm();
        })
      }
    })
    $('#regist-section').on('click','.cancel-btn', e=> {
      store.create = false
      store.edit = false
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
    handleEdit()
  }

  return {
    renderSideBar,
    handleEvents,
    renderDetail,
    renderForm
  }
}()