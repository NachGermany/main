(() => {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            const active = mobileMenu.classList.toggle("active");

            document.body.classList.toggle("menu-open", active);

            menuToggle.setAttribute(
                "aria-expanded",
                active ? "true" : "false"
            );

            mobileMenu.setAttribute(
                "aria-hidden",
                active ? "false" : "true"
            );
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");

                document.body.classList.remove("menu-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenu.setAttribute(
                    "aria-hidden",
                    "true"
                );
            });
        });
    }

    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => {
            item.classList.add("visible");
        });
    }
})();