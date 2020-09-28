const btns = document.querySelectorAll('.btn')
const cube = document.querySelector('.cube')
btns.forEach(function(item){
  item.addEventListener('click',function(){
    let name = item.dataset.name
    cube.className = "cube"
    cube.classList.toggle(name)
  })
})