/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/MenuCard.js":
/*!********************************!*\
  !*** ./js/modules/MenuCard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class MenuCard {
  constructor(src, alt, title, descr, price, parentSelector) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.parent = document.querySelector(parentSelector);
    this.transfer = 80;
    this.changeToRub();
  }

  changeToRub() {
    this.price = this.price * this.transfer;
  }

  render() {
    let element = document.createElement("div");
    element.innerHTML = `<div class="menu__item">
    <img src="${this.src}" alt="${this.alt}">
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">
    ${this.descr}
    </div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
      <div class="menu__item-cost">Цена:</div>
      <div class="menu__item-total"><span>${this.price}</span> Rub/день</div>
    </div>
  </div>`;

    this.parent.append(element);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuCard);


/***/ }),

/***/ "./js/modules/Slider.js":
/*!******************************!*\
  !*** ./js/modules/Slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slider);


/***/ }),

/***/ "./js/modules/Timer.js":
/*!*****************************!*\
  !*** ./js/modules/Timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Timer {
  constructor(deadline, selector) {
    this.deadline = deadline;
    this.selector = selector;
    this.updateClock();
    this.timeInterval;
  }

  getTimeRemaining() {
    const t = Date.parse(this.deadline) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  addZero(num) {
    return num >= 0 && num < 10 ? `0${num}` : num;
  }
  updateClock() {
    this.setClock();
    this.timeInterval = setInterval(() => this.setClock(), 1000);
  }

  setClock() {
    const timer = document.querySelector(this.selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");

    const t = this.getTimeRemaining();

    days.innerHTML = this.addZero(t.days);
    hours.innerHTML = this.addZero(t.hours);
    minutes.innerHTML = this.addZero(t.minutes);
    seconds.innerHTML = this.addZero(t.seconds);

    if (t.total <= 0) {
      clearInterval(timeInterval);
      days.innerHTML = "00";
      hours.innerHTML = "00";
      minutes.innerHTML = "00";
      seconds.innerHTML = "00";
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timer);


/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  const calcResultEl = document.querySelector(".calculating__result span");
  let sex, ratio, height, weight, age;

  function calcTotal() {
    calcResultEl.textContent = "____";
    if (!sex || !ratio || !age || !weight || !height) {
      return;
    }
    if (sex == "male") {
      calcResultEl.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    } else {
      calcResultEl.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    }
  }
  calcTotal();
  function getStaticInfo(parentSelector, activeClass) {
    const elemets = document.querySelectorAll(`${parentSelector} div`);

    elemets.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = e.target.getAttribute("data-ratio");
          calcTotal();
        } else {
          sex = e.target.getAttribute("id");
        }
        elemets.forEach((item) => {
          item.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  function getDynamicCalc(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }

  getDynamicCalc("#height");
  getDynamicCalc("#weight");
  getDynamicCalc("#age");

  getStaticInfo("#gender", "calculating__choose-item_active");
  getStaticInfo(".calculating__choose_big", "calculating__choose-item_active");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function form() {
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
              display: block;
              margin: 0 auto;
          `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      document.querySelector(".modal").classList.add("hide");
      document.querySelector(".modal").classList.remove("show");
      document.body.style.overflow = "";
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 300000);
  // Изменил значение, чтобы не отвлекало

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
  const tabsParentEL = document.querySelector(".tabheader__items");
  const tabsBtnEl = document.querySelectorAll(".tabheader__item");
  const tabsContentEL = document.querySelectorAll(".tabcontent");

  //  Hide all tabs content
  function hideTabContent() {
    tabsContentEL.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabsBtnEl.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  //  Show all tabs content
  function showTabContent(idx) {
    tabsContentEL[idx].classList.remove("hide");
    tabsContentEL[idx].classList.add("show", "fade");
    tabsBtnEl[idx].classList.add("tabheader__item_active");
  }

  // Listener for tabs parent hide or show content
  tabsParentEL.addEventListener("click", function (e) {
    let target = e.target;

    if (target.classList.contains("tabheader__item")) {
      tabsBtnEl.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  hideTabContent();
  showTabContent(0);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js");
/* harmony import */ var _modules_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/form.js */ "./js/modules/form.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal.js */ "./js/modules/modal.js");
/* harmony import */ var _modules_MenuCard_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/MenuCard.js */ "./js/modules/MenuCard.js");
/* harmony import */ var _modules_Slider_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/Slider.js */ "./js/modules/Slider.js");
/* harmony import */ var _modules_Timer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/Timer.js */ "./js/modules/Timer.js");
/* harmony import */ var _modules_calc_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc.js */ "./js/modules/calc.js");








window.addEventListener("DOMContentLoaded", () => {
  (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_form_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_calc_js__WEBPACK_IMPORTED_MODULE_6__["default"])();

  let slider = new _modules_Slider_js__WEBPACK_IMPORTED_MODULE_4__["default"](
    "offer__slide",
    "offer__slider-prev",
    "offer__slider-next",
    "total",
    "current",
    "offer__slider-wrapper",
    "offer__slider-inner",
    "offer__slider"
  );

  axios.get("http://localhost:3000/menu").then((response) => {
    response.data.forEach(({ img, altimg, title, descr, price }) => {
      new _modules_MenuCard_js__WEBPACK_IMPORTED_MODULE_3__["default"](
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  let timer = new _modules_Timer_js__WEBPACK_IMPORTED_MODULE_5__["default"]("2022-05-23", ".timer");

  //CALC
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map