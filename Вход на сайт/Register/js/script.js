// показать скрыть пароль
function show_hide_password(target) {
   var input = document.getElementById('password-input');
   if (input.getAttribute('type') == 'password') {
      target.classList.add('view');
      input.setAttribute('type', 'text');
   } else {
      target.classList.remove('view');
      input.setAttribute('type', 'password');
   }
   return false;
}
// показать скрыть пароль
const login_btn = document.querySelector(".login-btn")
const login_input = document.getElementById("login-input");
const password_input = document.getElementById("password-input");

login_btn.addEventListener("click", buttonClick);

function buttonClick(e) {
   e.preventDefault();
   if(login_input.value.length < 1 || password_input.value.length < 1) return;
   
   login_input.value = null;
   password_input.value = null;
}
function goToInput(e) {
   if(code.length > 3) {
       right_input.focus();
   } else {
       left_input.focus();
   }
}