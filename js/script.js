import tabs from "./modules/tabs.js";
import form from "./modules/form.js";
import modal from "./modules/modal.js";
import MenuCard from "./modules/MenuCard.js";
import Slider from "./modules/Slider.js";
import Timer from "./modules/Timer.js";
import calc from "./modules/calc.js";

window.addEventListener("DOMContentLoaded", () => {
  tabs();
  form();
  modal();
  calc();

  let slider = new Slider(
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
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  let timer = new Timer("2022-05-23", ".timer");

  //CALC
});
