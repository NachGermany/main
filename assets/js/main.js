(() => {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  const isActive = path => currentPath === path ? " active" : "";
  const menuGroups = {
    study: [
      ["Am I eligible?", "/study#requirements", "Admission requirements", "Grades, tests and documents"],
      ["APS verification", "/study#requirements", "Required for India and China", "Start early if it applies to you"],
      ["Admission chance", "/tools/admission-chance/", "See where you stand", "A practical first-pass check"],
      ["What will it cost?", "/tools/cost-of-living/", "Cost of living", "Build a monthly budget"],
      ["Blocked account", "/tools/blocked-account/", "Your proof of funds", "Plan your financial evidence"],
      ["The full path", "/study#process", "Application process", "Step by step, in order"]
    ],
    ausbildung: [
      ["Explore the route", "/ausbildung#requirements", "Requirements", "Education, German and the role"],
      ["Check your fit", "/tools/ausbildung-eligibility/", "Eligibility checker", "A useful first step"],
      ["Plan your work", "/tools/ausbildung-salary/", "Salary calculator", "Estimate training pay"],
      ["Compare paths", "/tools/ausbildung-vs-university/", "Ausbildung or university?", "Compare your options"]
    ],
    work: [
      ["Find your route", "/work#requirements", "Work requirements", "Qualification, role and recognition"],
      ["EU Blue Card", "/tools/blue-card/", "Eligibility checker", "Review the common conditions"],
      ["Chancenkarte", "/tools/chancenkarte/", "Points calculator", "Prepare the information you need"],
      ["Plan your income", "/tools/net-salary/", "Net salary calculator", "Estimate your take-home pay"]
    ]
  };
  const megaLinks = (key) => menuGroups[key].map(([group, href, title, description]) => `<a href="${href}"><em>${group}</em><strong>${title}</strong><span>${description}</span></a>`).join("");
  const mainNav = document.querySelector(".main-nav");
  const mobileNav = document.getElementById("mobileMenu");
  if (mainNav) {
    mainNav.innerHTML = `<div class="nav-item"><a class="nav-trigger${isActive("/study")}" href="/study">Study</a><div class="mega-menu"><h3>Study in Germany</h3>${megaLinks("study")}<a class="mega-cta" href="https://calendly.com/nachgermany-com/germany-profile-assessment" target="_blank" rel="noopener noreferrer"><strong>Check your profile</strong><span>Free, practical route conversation</span></a></div></div><div class="nav-item"><a class="nav-trigger${isActive("/ausbildung")}" href="/ausbildung">Ausbildung</a><div class="mega-menu"><h3>Ausbildung in Germany</h3>${megaLinks("ausbildung")}</div></div><div class="nav-item"><a class="nav-trigger${isActive("/work")}" href="/work">Work</a><div class="mega-menu"><h3>Work in Germany</h3>${megaLinks("work")}</div></div><a class="nav-tools${isActive("/tools")}" href="/tools/">Free tools</a><a class="nav-pricing${isActive("/pricing")}" href="/pricing/">Pricing</a><a class="nav-signup" href="https://app.nachgermany.com/register.html">Sign up</a><a class="nav-login" href="https://app.nachgermany.com/login.html">Sign in</a>`;
  }
  if (mobileNav) {
    mobileNav.innerHTML = `<a href="/study">Study</a><a href="/ausbildung">Ausbildung</a><a href="/work">Work</a><a class="mobile-tools" href="/tools/">Explore free tools</a><a href="/pricing/">Pricing</a><a class="mobile-signup" href="https://app.nachgermany.com/register.html">Sign up</a><a class="mobile-login" href="https://app.nachgermany.com/login.html">Sign in</a><a class="mobile-cta" href="https://calendly.com/nachgermany-com/germany-profile-assessment" target="_blank" rel="noopener noreferrer">Check your profile</a>`;
  }

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const closeMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileMenu.setAttribute("aria-hidden", "true");
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const active = mobileMenu.classList.toggle("open");
      document.body.classList.toggle("menu-open", active);
      menuToggle.setAttribute("aria-expanded", active ? "true" : "false");
      menuToggle.setAttribute("aria-label", active ? "Close menu" : "Open menu");
      mobileMenu.setAttribute("aria-hidden", active ? "false" : "true");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  document.querySelectorAll("[data-carousel]").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = track ? Array.from(track.children) : [];
    const previous = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const dots = carousel.querySelector("[data-carousel-dots]");

    if (!track || !slides.length || !previous || !next || !dots) return;

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
        const active = slideIndex === current;
        slide.setAttribute("aria-hidden", active ? "false" : "true");
        slide.inert = !active;
      });
      Array.from(dots.children).forEach((dot, dotIndex) => {
        const active = dotIndex === current;
        dot.classList.toggle("active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
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
      if (Math.abs(distance) > 45) showSlide(current + (distance < 0 ? 1 : -1));
    }, { passive: true });

    carousel.tabIndex = 0;
    showSlide(0);
  });

  const evaluationForm = document.getElementById("evaluationForm");
  const evaluationSuccess = document.getElementById("evaluationSuccess");

  if (evaluationForm && evaluationSuccess) {
    const submitButton = evaluationForm.querySelector(".form-submit");
    const status = document.getElementById("formStatus");
    const fields = {
      firstName: {
        input: document.getElementById("firstName"),
        error: document.getElementById("firstNameError"),
        message: "Please enter your first name."
      },
      email: {
        input: document.getElementById("email"),
        error: document.getElementById("emailError"),
        message: "Please enter a valid email address."
      },
      phone: {
        input: document.getElementById("phone"),
        error: document.getElementById("phoneError"),
        message: "Please enter a valid international phone number."
      }
    };
    const typeGroup = evaluationForm.querySelector("fieldset");
    const typeError = document.getElementById("applicationTypeError");

    const setError = (field, message) => {
      field.error.textContent = message;
      field.error.hidden = false;
      field.input.closest(".form-field").classList.add("has-error");
    };

    const clearError = field => {
      field.error.textContent = "";
      field.error.hidden = true;
      field.input.closest(".form-field").classList.remove("has-error");
    };

    const clearTypeError = () => {
      typeError.textContent = "";
      typeError.hidden = true;
      typeGroup.classList.remove("has-error");
    };

    const validate = () => {
      let firstInvalid = null;
      Object.values(fields).forEach(clearError);
      clearTypeError();
      status.textContent = "";

      const firstName = fields.firstName.input.value.trim();
      const email = fields.email.input.value.trim();
      const phone = fields.phone.input.value.trim();
      const phoneDigits = phone.replace(/\D/g, "");
      const selectedType = evaluationForm.querySelector("input[name='applicationType']:checked");

      if (!firstName) {
        setError(fields.firstName, fields.firstName.message);
        firstInvalid = firstInvalid || fields.firstName.input;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError(fields.email, fields.email.message);
        firstInvalid = firstInvalid || fields.email.input;
      }
      if (!/^[+()\d][\d\s().-]{6,}$/.test(phone) || phoneDigits.length < 7) {
        setError(fields.phone, fields.phone.message);
        firstInvalid = firstInvalid || fields.phone.input;
      }
      if (!selectedType) {
        typeError.textContent = "Please choose an application type.";
        typeError.hidden = false;
        typeGroup.classList.add("has-error");
        firstInvalid = firstInvalid || typeGroup.querySelector("input");
      }

      if (firstInvalid) firstInvalid.focus();
      return !firstInvalid;
    };

    evaluationForm.addEventListener("submit", async event => {
      event.preventDefault();
      if (!validate()) return;

      submitButton.disabled = true;
      submitButton.textContent = "Preparing your evaluation…";
      evaluationForm.setAttribute("aria-busy", "true");

      try {
        /*
         * No public endpoint exists in this repository. A future endpoint can
         * be connected with data-endpoint without exposing credentials here.
         */
        const endpoint = evaluationForm.dataset.endpoint;
        if (endpoint) {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(evaluationForm)))
          });
          if (!response.ok) throw new Error("Submission failed");
        } else {
          await new Promise(resolve => window.setTimeout(resolve, 350));
        }
        evaluationForm.hidden = true;
        evaluationSuccess.hidden = false;
      } catch (error) {
        submitButton.disabled = false;
        submitButton.textContent = "Get my free evaluation";
        evaluationForm.removeAttribute("aria-busy");
        status.textContent = "We could not prepare the confirmation. Please try again.";
      }
    });
  }

  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const expanded = question.getAttribute("aria-expanded") === "true";
      faqQuestions.forEach(otherQuestion => {
        const answer = document.getElementById(otherQuestion.getAttribute("aria-controls"));
        const isCurrent = otherQuestion === question;
        otherQuestion.setAttribute("aria-expanded", isCurrent && !expanded ? "true" : "false");
        if (answer) answer.hidden = !(isCurrent && !expanded);
      });
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    revealItems.forEach(item => {
      item.classList.add("reveal-hidden");
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add("reveal-visible"));
  }
})();
