function toggle_nav_expand() {
    const nav = document.querySelector("nav");
    if(nav.classList.contains("expanded")) {
        nav.classList.remove("expanded");
    } else {
        nav.classList.add("expanded");
    }
}
