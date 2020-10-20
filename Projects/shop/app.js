document.querySelector('.show-product')
  .addEventListener('click',function(){
    document.querySelector('.cover')
      .style.display = 'block'
    document.querySelector('.shopping-list')
      .style.width = '340px';
      setTimeout(()=>{
        document.querySelector('.header-shopping-list')
        .classList.toggle('show')
        document.querySelector('.body-shopping-list')
          .classList.toggle('show')
      },500)
  })
document.addEventListener('click',function(event){
  if (event.target.classList.contains("cover") || event.target.classList.contains("close-shopping-list")) {
    document.querySelector('.shopping-list')
    .style.width = '0';

    document.querySelector('.header-shopping-list')
    .classList.toggle('show')

    document.querySelector('.body-shopping-list')
      .classList.toggle('show')

    document.querySelector('.cover')
      .style.display = 'none'
  }
})
// ---------------------------------------------------------
let products = [];
fetch('assets/products.json')
  .then((res)=>{
    if (res.ok) {
      return res.json();
    }else{
      throw new Error("Faild");
    }
  }).then((obj)=>{
    products = obj.products
    renderDom(products)
  }).catch((err)=>{
    console.log(err);
  })


  function createDom(product){
    return`
    <article class="product">
      <figure class="image-product">
        <img src="${product.image}" alt="${product.title}">
      </figure>
      <div class="body-card">
        <a href=""><h2 class="title-product">${product.title}</h2></a>
        <span class="price">${product.price}$</span>
        <p class="discription-product">${product.description}</p>
      </div>
      <footer class="footer-product">
        <button class="btn-footer-product" data-product-id = "${product.id}">Add To Cart</button>
      </footer>
    </article>
    `
  }

  function renderCart(cart){

    if (cart.length == 0) {
      document.querySelector('.body-shopping-list')
        .innerHTML = '<span class="alert">Your Shopping List Is Empty!</span>'
    }else{
      let cartHtml = cart.map((item)=>{
        return  `<div class="card">
                   <img class="shopping-list-img" src="${item.image}" alt="${item.title}">
                   <h2 class="card-title">${item.title}</h2>
                  <div class="count">
                    <span class="inc-quantity" data-product-id = "${item.id}">+</span>
                    <span>${item.quantity}</span>
                    <span class="dec-quantity" data-product-id = "${item.id}">-</span>
                  </div>
                </div>`
      }).join('');
  
      document.querySelector('.body-shopping-list')
      .innerHTML = cartHtml
    }
  }

  function setStorage(cart) {
		window.localStorage.setItem('cart', JSON.stringify(cart));
	}

	function getStorage() {
		if (window.localStorage.getItem('cart')) {
			return JSON.parse(window.localStorage.getItem('cart'));
		} else {
			return [];
		}
	}
	
  let cart = getStorage()
  renderCart(cart)
  quantityOfAllProducts(cart)

  function renderDom(products){
    products.map((product)=>{
      document.querySelector('.products')
      .innerHTML += createDom(product) ;
    })
  }


  function addToCart(productId, products,cart) {
		const addedProduct = products.filter(product => product.id == productId)[0];

		const productInCart = cart.find(item => item.id == productId);

		if(productInCart){
			return cart.map(item =>
				item.id == productId ? {...item, quantity: item.quantity + 1} : item
			);
		}else{
			return [...cart, {...addedProduct, quantity: 1}];
		}

	}


  function takeFromCart(productId, cart) {
		const productInCart = cart.find(item => item.id == productId);
	
		if (productInCart.quantity === 1) {
			return cart.filter(item => !(item.id == productId));
		} else {
			return cart.map(item =>
				item.id == productId ? {...item, quantity: item.quantity - 1} : item
			);
		}
	}

  function quantityOfAllProducts(cart){
    let sum = 0
    cart.map((item)=>{
      sum += item.quantity
    })
    document.querySelector('.badge')
      .innerHTML = sum
  }
 
  document.addEventListener('click', function (e) {
		if (e.target && e.target.classList.contains('btn-footer-product')) {
			const productId = e.target.getAttribute('data-product-id');
      cart = addToCart(productId, products , cart)
      quantityOfAllProducts(cart)
			getStorage()
			setStorage(cart)
			renderCart(cart)

		} else if (e.target && e.target.classList.contains('inc-quantity')) {
			const productId = e.target.getAttribute('data-product-id');
			cart = addToCart(productId, products , cart)
			getStorage()
			setStorage(cart)
      renderCart(cart)
      quantityOfAllProducts(cart)
		} else if (e.target && e.target.classList.contains('dec-quantity')) {
			const productId = e.target.getAttribute('data-product-id');
			cart = takeFromCart(productId, cart)
			setStorage(cart)
      renderCart(cart)
      quantityOfAllProducts(cart)
		}
	});

