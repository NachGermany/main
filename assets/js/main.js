(() => {
"use strict";

```
/*
 * Mobile navigation
 */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
    const closeMenu = () => {
        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");

        mobileMenu.setAttribute("aria-hidden", "true");
    };

    const openMenu = () => {
        mobileMenu.classList.add("active");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close menu");

        mobileMenu.setAttribute("aria-hidden", "false");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });
}


/*
 * Scroll reveal
 */

const revealItems = document.querySelectorAll(".reveal");

if (!revealItems.length) {
    return;
}

if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                observerInstance.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    revealItems.forEach((item) => {
        observer.observe(item);
    });
} else {
    revealItems.forEach((item) => {
        item.classList.add("visible");
    });
}
```

})();
