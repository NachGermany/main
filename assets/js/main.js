(() => {

```
const menuButton = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (!menuButton || !mobileMenu) {
    return;
}

menuButton.addEventListener("click", () => {

    const isOpen = mobileMenu.classList.toggle("active");

    menuButton.classList.toggle("active", isOpen);

    menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );

    document.body.style.overflow = isOpen
        ? "hidden"
        : "";
});


mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.style.overflow = "";
        });

    });


window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {

        mobileMenu.classList.remove("active");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.style.overflow = "";
    }

});
```

})();
