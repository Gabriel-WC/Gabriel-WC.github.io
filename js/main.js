(() => {
  "use strict";

  const qrButtons = document.querySelectorAll("[data-qr-target]");

  qrButtons.forEach((button) => {
    const media = document.getElementById(button.dataset.qrTarget);
    if (!media) return;

    const previewFace = media.querySelector(".secondary-media__preview");
    const qrFace = media.querySelector(".secondary-media__qr");

    button.addEventListener("click", () => {
      const showingQr = media.classList.toggle("is-qr");

      button.setAttribute("aria-pressed", String(showingQr));
      button.textContent = showingQr ? "Voltar preview" : "QR Code";
      previewFace?.setAttribute("aria-hidden", String(showingQr));
      qrFace?.setAttribute("aria-hidden", String(!showingQr));
    });
  });

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("in"));
  }

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-navigation");

  const closeMenu = () => {
    if (!navToggle || !nav) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
    nav.classList.remove("is-open");
  };

  navToggle?.addEventListener("click", () => {
    if (!nav) return;
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    nav.classList.toggle("is-open", !isOpen);
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) closeMenu();
  });

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
