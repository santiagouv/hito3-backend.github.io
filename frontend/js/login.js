const wrapper2 = document.querySelector('.wrapper2');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLoginPopup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper2.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper2.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper2.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper2.classList.remove('active-popup');
});