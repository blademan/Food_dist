class Slider {
  constructor(
    slides,
    prev,
    next,
    total,
    current,
    slidesWrapper,
    slidesField,
    slider
  ) {
    this.slides = document.querySelectorAll(`.${slides}`);
    this.prev = document.querySelector(`.${prev}`);
    this.next = document.querySelector(`.${next}`);
    this.total = document.querySelector(`#${total}`);
    this.current = document.querySelector(`#${current}`);
    this.slidesWrapper = document.querySelector(`.${slidesWrapper}`);
    this.slidesField = document.querySelector(`.${slidesField}`);
    this.slider = document.querySelector(`.${slider}`);
    this.width = window.getComputedStyle(
      document.querySelector(`.${slidesWrapper}`)
    ).width;

    this.offset = 0;
    this.slideIndex = 1;
    this.dots = [];
    this.init();
    this.nextSlide();
    this.prevSlide();
    this.dotsF();
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
    this.dots.forEach((dot) => (dot.style.opacity = ".5"));
    // this.dots[this.slideIndex - 1].style.opacity = 1;
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
        this.dots.forEach((dot) => (dot.style.opacity = ".5"));
        this.dots[this.slideIndex - 1].style.opacity = 1;
      } else {
        this.slideIndex++;
        this.dots.forEach((dot) => (dot.style.opacity = ".5"));
        this.dots[this.slideIndex - 1].style.opacity = 1;
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
        this.dots.forEach((dot) => (dot.style.opacity = ".5"));
        this.dots[this.slideIndex - 1].style.opacity = 1;
      } else {
        this.slideIndex--;
        this.dots.forEach((dot) => (dot.style.opacity = ".5"));
        this.dots[this.slideIndex - 1].style.opacity = 1;
      }

      if (this.slides.length < 10) {
        this.current.textContent = `0${this.slideIndex}`;
      } else {
        this.current.textContent = this.slideIndex;
      }
    });
  }
  dotsF() {
    this.slider.style.position = "relative";
    const indicators = document.createElement("ol");

    indicators.classList.add("carousel-indicators");
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    this.slider.append(indicators);

    for (let i = 0; i < this.slides.length; i++) {
      const dot = document.createElement("li");
      dot.setAttribute("data-slide-to", i + 1);
      dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: .5;
          transition: opacity .6s ease;
      `;
      if (i == 0) {
        dot.style.opacity = 1;
      }
      indicators.append(dot);
      this.dots.push(dot);
    }

    this.dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const slideTo = e.target.getAttribute("data-slide-to");

        this.slideIndex = slideTo;
        this.offset =
          +this.width.slice(0, this.width.length - 2) * (slideTo - 1);

        this.slidesField.style.transform = `translateX(-${this.offset}px)`;

        if (this.slides.length < 10) {
          this.current.textContent = `0${this.slideIndex}`;
        } else {
          this.current.textContent = this.slideIndex;
        }

        this.dots.forEach((dot) => (dot.style.opacity = ".5"));
        this.dots[this.slideIndex - 1].style.opacity = 1;
      });
    });
  }
}
export default Slider;
