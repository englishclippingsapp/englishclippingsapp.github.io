const gallery = document.querySelector(".screenshot-gallery");

if (gallery) {
  const slides = [...gallery.querySelectorAll("figure")];
  const previousButton = document.querySelector(".gallery-previous");
  const nextButton = document.querySelector(".gallery-next");
  const dotsContainer = document.querySelector(".gallery-dots");
  let currentIndex = 0;

  const dots = slides.map((slide, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-dot";
    button.setAttribute("aria-label", `Show screenshot ${index + 1}`);
    button.addEventListener("click", () => showSlide(index));
    dotsContainer.append(button);
    return button;
  });

  function updateControls() {
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;
    dots.forEach((dot, index) => {
      dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
    });
  }

  function showSlide(index) {
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    gallery.scrollTo({ left: currentIndex * gallery.clientWidth, behavior: "smooth" });
    updateControls();
  }

  previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  gallery.addEventListener("scroll", () => {
    window.requestAnimationFrame(() => {
      currentIndex = Math.round(gallery.scrollLeft / gallery.clientWidth);
      updateControls();
    });
  }, { passive: true });

  gallery.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showSlide(currentIndex - 1);
    if (event.key === "ArrowRight") showSlide(currentIndex + 1);
  });

  updateControls();
}
