let barsIcon = document.querySelector('.bars');
var listMenu = document.querySelector('.menuList');

barsIcon.addEventListener('click', () => {
    console.log("clicked")
    listMenu.classList.toggle("active");
    barsIcon.classList.toggle('active')

})


