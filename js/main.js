document.querySelector('.header__close--btn')
    .addEventListener('click',function(e){
        console.log(document.querySelector('.header__close--btn').textContent);
        if (document.querySelector('.header__close--btn').textContent == '=') {
            document.querySelector('.header__close--btn').textContent = 'x'
        }else{
            document.querySelector('.header__close--btn').textContent = '='
        }
        document.querySelector('.header__menu')
            .classList.toggle('toggel');
            document.querySelectorAll('.header__menu li')
            .forEach(item => {
                item.style.transition = 'none'
                item.style.opacity = '0'
            });
            if (document.querySelector('.header__menu').classList.contains('toggel')) {
                setTimeout(()=>{
                    document.querySelectorAll('.header__menu li')
                    .forEach(item => {
                        item.style.transition = 'all 500ms ease-in-out'
                        item.style.opacity = '1'
                    });
                },600)
            }
    });
window.addEventListener('scroll',function(){
    
    if (document.querySelector('.header__menu').classList.contains('toggel')) {
        if (document.querySelector('.header__close--btn').textContent == '=') {
            document.querySelector('.header__close--btn').textContent = 'x'
        }else{
            document.querySelector('.header__close--btn').textContent = '='
        }
        document.querySelector('.header__menu')
        .classList.toggle('toggel');
        document.querySelectorAll('.header__menu li')
        .forEach(item => {
            item.style.transition = 'none'
            item.style.opacity = '0'
        });
    }
})