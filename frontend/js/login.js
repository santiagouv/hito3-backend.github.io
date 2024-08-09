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

function register(){
    console.log('registro');

        let email_logon = document.getElementById("email_register");
        let password_logon = document.getElementById("password_register");
        let username_logon = document.getElementById("username_register");
        
        var login = new Object();
        login.email = email_logon.value;
        login.password = password_logon.value;
        login.username = username_logon.value;
    
       // console.log(login);
        var url = "http://74.242.171.91:3000/api/register";
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log('entro');
              //console.log(this.responseText);
              var resp = JSON.parse(this.responseText);
              console.log(resp);
              if(resp.register =='ok'){
                wrapper2.classList.remove('active');
              }
            }
        };
        //console.log(JSON.stringify(login));
        xhr.send(JSON.stringify(login));
        //console.log(xhr.responseText);
}

function login(){
    //console.log('login');
    let email_logon = document.getElementById("email_login");
    let password_logon = document.getElementById("password_login");
    
    var login = new Object();
    login.email = email_logon.value;
    login.password = password_logon.value;

   // console.log(login);
    var url = "http://74.242.171.91:3000/api/login";
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('entro');
          //console.log(this.responseText);
          var resp = JSON.parse(this.responseText);
          console.log(resp);
          if(resp.login =='ok'){
            window.location='index.html';
          }
        }
    };
    //console.log(JSON.stringify(login));
    xhr.send(JSON.stringify(login));
    //console.log(xhr.responseText);
   
   
}
