export default class Slider {
  constructor(slides, prev, next, total, current, slidesWrapper, slidesField) {
    this.slides = document.querySelectorAll(`.${slides}`);
    this.prev = document.querySelector(`.${prev}`);
    this.next = document.querySelector(`.${next}`);
    this.total = document.querySelector(`#${total}`);
    this.current = document.querySelector(`#${current}`);
    this.slidesWrapper = document.querySelector(`.${slidesWrapper}`);
    this.slidesField = document.querySelector(`.${slidesField}`);

    this.width = window.getComputedStyle(
      document.querySelector(`.${slidesWrapper}`)
    ).width;

    this.offset = 0;
    this.slideIndex = 1;
    this.init();
    this.nextSlide();
    this.prevSlide();
  }

  init() {
    if (this.slides.length < 10) {
      this.total.textContent = `0${this.slides.length}`;
      this.current.textContent = `0${this.slideIndex}`;
    } else {
      this.total.textContent = this.slides.length;
      this.current.textContent = this.slideIndex;
    }

    this.slidesField.style.width = 100 * this.slides.length + "%";
    this.slidesField.style.display = "flex";
    this.slidesField.style.transition = "0.5s all";

    this.slidesWrapper.style.overflow = "hidden";

    this.slides.forEach((slide) => {
      slide.style.width = this.width;
    });
  }

  nextSlide() {
    this.next.addEventListener("click", () => {
      if (
        this.offset ==
        +this.width.slice(0, this.width.length - 2) * (this.slides.length - 1)
      ) {
        this.offset = 0;
      } else {
        this.offset += +this.width.slice(0, this.width.length - 2);
      }

      this.slidesField.style.transform = `translateX(-${this.offset}px)`;

      if (this.slideIndex == this.slides.length) {
        this.slideIndex = 1;
      } else {
        this.slideIndex++;
      }

      if (this.slides.length < 10) {
        this.current.textContent = `0${this.slideIndex}`;
      } else {
        this.current.textContent = this.slideIndex;
      }
    });
  }

  prevSlide() {
    this.prev.addEventListener("click", () => {
      if (this.offset == 0) {
        this.offset =
          +this.width.slice(0, this.width.length - 2) *
          (this.slides.length - 1);
      } else {
        this.offset -= +this.width.slice(0, this.width.length - 2);
      }

      this.slidesField.style.transform = `translateX(-${this.offset}px)`;

      if (this.slideIndex == 1) {
        this.slideIndex = this.slides.length;
      } else {
        this.slideIndex--;
      }

      if (this.slides.length < 10) {
        this.current.textContent = `0${this.slideIndex}`;
      } else {
        this.current.textContent = this.slideIndex;
      }
    });
  }
}
