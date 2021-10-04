const div_input = document.querySelector(".password")
const left_input = document.querySelector(".left_password")
const right_input = document.querySelector(".right_password")
const login_btn = document.querySelector(".login-btn")

let code = [];

// EVENTS
div_input.addEventListener("click", goToInput);
left_input.addEventListener("input", leftInput);
right_input.addEventListener("input", rightInput);
login_btn.addEventListener("click", buttonClick);

// FUNC
function buttonClick(e) {
    e.preventDefault();
    code = [];
    left_input.value = null;
    right_input.value = null;
    left_input.focus();
}
function goToInput(e) {
    if(code.length > 3) {
        right_input.focus();
    } else {
        left_input.focus();
    }
}

function leftInput(e) {
    if(e.inputType === "insertFromPaste") {
        e.target.value = null;
        return;
    } else if(e.inputType === "deleteContentBackward") {
        if(code.length - 1 < 0){
            return
        } else {
            code.pop()
            return;
        }
    } else {
        if(!Number.parseInt(e.data) && e.data !== '0') {
            e.target.value = e.target.value.slice(0,-1)
            return;
        }
        
        if(code.length + 1 >= 3) right_input.focus();

        code.push(Number.parseInt(e.data));
    }
}

function rightInput(e) {
    if(e.inputType === "deleteContentBackward") {
        if(code.length - 1 < 4){
            left_input.focus();
        } 
        code.pop()
        return;
    } else {
        if(!Number.parseInt(e.data) && e.data !== '0') {
            e.target.value = e.target.value.slice(0,-1)
            return;
        }

        if(code.length + 1 > 6) {
            e.target.value = e.target.value.slice(0,-1)
            return;
        }

        code.push(Number.parseInt(e.data));
    }
}
