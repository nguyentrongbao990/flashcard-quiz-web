document.addEventListener("DOMContentLoaded", async function () {
    const headerContainer = document.getElementById("header-container");
    if (!headerContainer) return;

    const response = await fetch("header.html");
    const html = await response.text();
    headerContainer.innerHTML = html;
});