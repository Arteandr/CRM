let theme = localStorage.getItem("theme");
if(!theme) {
    theme = "light";
    localStorage.setItem("theme", "light");
} 
let switch_theme_btn;


switch (theme) {
    case "light":
        document.body.classList.remove("dark");
        break;
    case "dark":
        document.body.classList.add("dark");
        break;
}
document.addEventListener("DOMContentLoaded", () => {
    switch_theme_btn = document.querySelector(".switch input");
    switch (theme) {
        case "light":
            switch_theme_btn.setAttribute("checked", true);
            break;
        case "dark":
            switch_theme_btn.removeAttribute("checked");
            break;
    }
    switch_theme_btn.addEventListener("click", switchTheme);
})

function switchTheme() {
    if(theme.toLowerCase() === "light") {
        theme = "dark";
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
        switch_theme_btn.removeAttribute("checked");
    } else if(theme.toLowerCase() === "dark") {
        theme = "light";
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
        switch_theme_btn.setAttribute("checked", true);
    }
}