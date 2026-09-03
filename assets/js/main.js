(() => {

      const menuToggle =
        document.getElementById("menuToggle");

      const mobileMenu =
        document.getElementById("mobileMenu");


      if (menuToggle && mobileMenu) {

        menuToggle.addEventListener(
          "click",
          () => {

            const active =
              mobileMenu.classList.toggle("open");

            document.body.classList.toggle(
              "menu-open",
              active
            );

            menuToggle.setAttribute(
              "aria-expanded",
              active ? "true" : "false"
            );

            mobileMenu.setAttribute(
              "aria-hidden",
              active ? "false" : "true"
            );

          }
        );


        mobileMenu
          .querySelectorAll("a")
          .forEach(link => {

            link.addEventListener(
              "click",
              () => {

                mobileMenu.classList.remove(
                  "open"
                );

                document.body.classList.remove(
                  "menu-open"
                );

                menuToggle.setAttribute(
                  "aria-expanded",
                  "false"
                );

                mobileMenu.setAttribute(
                  "aria-hidden",
                  "true"
                );

              }
            );

          });

      }


      document.querySelectorAll("[data-carousel]").forEach(carousel => {
        const track = carousel.querySelector(".carousel-track");
        const slides = Array.from(track.children);
        const previous = carousel.querySelector("[data-carousel-prev]");
        const next = carousel.querySelector("[data-carousel-next]");
        const dots = carousel.querySelector("[data-carousel-dots]");
        let current = 0;
        let startX = 0;

        slides.forEach((slide, index) => {
          slide.setAttribute("role", "group");
          slide.setAttribute("aria-roledescription", "slide");
          slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
          slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");
          slide.inert = index !== 0;

          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = "carousel-dot";
          dot.setAttribute("aria-label", `Show slide ${index + 1}`);
          dot.addEventListener("click", () => showSlide(index));
          dots.appendChild(dot);
        });

        function showSlide(index) {
          current = Math.max(0, Math.min(index, slides.length - 1));
          track.style.transform = `translateX(-${current * 100}%)`;
          slides.forEach((slide, slideIndex) => {
            slide.setAttribute("aria-hidden", slideIndex === current ? "false" : "true");
            slide.inert = slideIndex !== current;
          });
          Array.from(dots.children).forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === current);
            dot.setAttribute("aria-current", dotIndex === current ? "true" : "false");
          });
          previous.disabled = current === 0;
          next.disabled = current === slides.length - 1;
        }

        previous.addEventListener("click", () => showSlide(current - 1));
        next.addEventListener("click", () => showSlide(current + 1));
        carousel.addEventListener("keydown", event => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showSlide(current - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            showSlide(current + 1);
          }
        });
        carousel.addEventListener("touchstart", event => {
          startX = event.touches[0].clientX;
        }, { passive: true });
        carousel.addEventListener("touchend", event => {
          const distance = event.changedTouches[0].clientX - startX;
          if (Math.abs(distance) > 45) {
            showSlide(current + (distance < 0 ? 1 : -1));
          }
        }, { passive: true });

        carousel.tabIndex = 0;
        showSlide(0);
      });


      const revealItems =
        document.querySelectorAll(".reveal");


      if ("IntersectionObserver" in window) {

        const observer =
          new IntersectionObserver(
            entries => {

              entries.forEach(entry => {

                if (entry.isIntersecting) {

                  entry.target.classList.add(
                    "visible"
                  );

                  observer.unobserve(
                    entry.target
                  );

                }

              });

            },
            {
              threshold: .12
            }
          );


        revealItems.forEach(
          item => observer.observe(item)
        );

      } else {

        revealItems.forEach(
          item => item.classList.add("visible")
        );

      }

    })();
