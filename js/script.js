import modal from "./Modal.js";
import MenuCard from "./MenuCard.js";
import tabs from "./Tabs.js";
import Timer from "./Timer.js";
import form from "./Form.js";
import Slider from "./Slider.js";

window.addEventListener("DOMContentLoaded", () => {
  modal();
  tabs();
  form();
  let myTimer = new Timer("2022-05-23", ".timer");

  let slider1 = new Slider(
    "offer__slide",
    "offer__slider-prev",
    "offer__slider-next",
    "total",
    "current",
    "offer__slider-wrapper",
    "offer__slider-inner",
    "offer__slider"
  );

  // axios.get("http://localhost:3000/menu").then((response) => {
  //   response.data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  //CALC

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
});
