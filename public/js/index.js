let hamIcon = document.querySelector('.navbar-toggler-btn');
var menuList = document.querySelector('.menuList');

hamIcon.addEventListener('click', () => {
    menuList.classList.toggle("active");
    hamIcon.classList.toggle('active')



})
