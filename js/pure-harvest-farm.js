// toggle ham-menu
const hamMenu = document.querySelector('.ham-menu');
const sideNav = document.querySelector('.side-nav');

hamMenu.addEventListener("click",()=>{
    hamMenu.classList.toggle("active");
    sideNav.classList.toggle("active");
})