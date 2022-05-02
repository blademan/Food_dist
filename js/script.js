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
    "offer__slider-inner"
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
});
