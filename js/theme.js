// Theme switcher (light / dark). Works on every page.
// The chosen theme is saved in localStorage, so it stays the same on other pages.

function applyTheme(theme) {
    const themeBtn = document.getElementById("theme-btn");
    const isDark = theme === "dark";

    // classList.toggle(name, condition) adds the class if condition is true, removes it if false
    document.body.classList.toggle("dark-theme", isDark);

    if (themeBtn) {
        themeBtn.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let currentTheme = localStorage.getItem("theme") || "light";
    applyTheme(currentTheme);

    const themeBtn = document.getElementById("theme-btn");
    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            currentTheme = currentTheme === "dark" ? "light" : "dark";
            localStorage.setItem("theme", currentTheme);
            applyTheme(currentTheme);
        });
    }
});
