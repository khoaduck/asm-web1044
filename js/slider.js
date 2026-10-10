/**
 * VOLT STORE - SLIDER / BANNER CHẠY TỰ ĐỘNG
 */

function initEditorialSlider() {
  const sliderContainer = document.querySelector(".slider-container");
  const slides = document.querySelectorAll(".slide-item");
  const dotsContainer = document.querySelector(".slider-dots");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  const counterEl = document.querySelector(".slide-counter");

  if (!sliderContainer || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval = null;

  // Tạo chấm chuyển slide (dots)
  dotsContainer.innerHTML = "";
  slides.forEach((_, idx) => {
    const dot = document.createElement("div");
    dot.className = `dot ${idx === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function updateSlider() {
    sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Cập nhật chấm active
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });

    // Cập nhật chỉ số Editorial "01 / 03"
    if (counterEl) {
      const formattedCurrent = String(currentIndex + 1).padStart(2, "0");
      const formattedTotal = String(totalSlides).padStart(2, "0");
      counterEl.innerText = `${formattedCurrent} / ${formattedTotal}`;
    }
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  // Sự kiện nút Next / Prev
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Tự động chạy
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4500);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Dừng khi di chuột vào, chạy lại khi rời đi
  const sliderWrapper = document.querySelector(".hero-slider-wrapper");
  if (sliderWrapper) {
    sliderWrapper.addEventListener("mouseenter", stopAutoSlide);
    sliderWrapper.addEventListener("mouseleave", startAutoSlide);
  }

  updateSlider();
  startAutoSlide();
}

document.addEventListener("DOMContentLoaded", initEditorialSlider);
