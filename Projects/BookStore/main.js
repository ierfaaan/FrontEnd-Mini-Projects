const products = [
  {id:1,title:'You Don\'t Know JS',description:"this is JavaScript Book"},
  {id:2,title:'HTML & CSS: Design and Build Web Sites',description:"this is HTML/CSS Book"},
  {id:3,title:'Automate the Boring Stuff with Python',description:"this is Python Book"},
  {id:4,title:'The Road to Learn React JS',description:"this is React-Js Book"},
  {id:5,title:'Modern PHP',description:"this is PHP Book"}
]
const app = document.querySelector('.app')
const searchbox = document.getElementById('searchBox')

//Dom
function createDom(product){
    const title = document.createElement('h3')
    title.setAttribute('class','title')
    title.textContent = product.title
  
    const del = document.createElement('span')
    del.setAttribute('class','del')
    del.textContent = "✖️";
    del.addEventListener('click',function(){
      removeProduct(product.id)
      rednerDom(getproducts())
    })

    const des = document.createElement('p')
    des.setAttribute('class','description')
    des.textContent = product.description
  
    const box = document.createElement('div')
    box.setAttribute('class','box')
    box.appendChild(title)
    box.appendChild(des)
    box.appendChild(del)
    
    return box
}

//render
function rednerDom(products,filter = searchbox.value,searchby = 'title'){
    app.innerHTML = ''

    let filterProduct = products.filter(function(product) {

      if (searchby === 'title') {
        return product.title.toLowerCase().includes(filter.toLowerCase())
      }else if(searchby === 'description'){
        return product.description.toLowerCase().includes(filter.toLowerCase())
      }
     
    }); 

    filterProduct.forEach(function(product,index){
      app.appendChild(createDom(product,index))
    })
}

//remove
function removeProduct(id){
  let newproducts = getproducts()
  const productIndex = newproducts.findIndex((item)=>{
    return item.id === id
  })
  if (productIndex > -1) {
    newproducts.splice(productIndex, 1)
    setProducts(newproducts)
  }
}



const selectBox = document.getElementById('searchBy')
//search
searchbox.addEventListener('input',function(event){
    let searchval = event.target.value
    rednerDom(getproducts(),searchval)
})

//Search By
let searchby = selectBox.value
selectBox.addEventListener('change',function(event){
  searchby = selectBox.value
  searchval = searchbox.value
  rednerDom(getproducts(),searchval,searchby)
})


//get products
function getproducts(){
  if (localStorage.getItem('products') !== null) {
    return JSON.parse(localStorage.getItem('products'))
  }else{
    return products
  }
}

//set products
function setProducts(products){
  localStorage.setItem('products',JSON.stringify(products))
}

//add product
  document.querySelector('.add-products')
  .addEventListener('submit',function(event){
    if (event.target.elements.Title.value === '' && event.target.elements.Title.value === '') {
      alert("Please Enter title and description for book <3")
    }else{
      event.preventDefault()
      let lastid = products.length
      products.unshift({
        id : lastid + 1 ,
        title: event.target.elements.Title.value,
        description:event.target.elements.Description.value ,
      })
      event.target.elements.Title.value = ''
      event.target.elements.Description.value = ''
      setProducts(products)
      rednerDom(getproducts())
   }
  })

rednerDom(getproducts())