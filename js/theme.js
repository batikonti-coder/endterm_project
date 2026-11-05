function applyTheme(theme) {
    const themeBtn = document.getElementById("theme-btn");
    const isDark = theme === "dark";

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
