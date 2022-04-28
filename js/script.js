import modal from "./Modal.js";
import MenuCard from "./MenuCard.js";
import tabs from "./Tabs.js";
import Timer from "./Timer.js";
window.addEventListener("DOMContentLoaded", () => {
  modal();
  tabs();
  let myTimer = new Timer("2022-05-23", ".timer");

  new MenuCard(
    "img/tabs/vegy.jpg",
    "post",
    'Меню "Фитнес"',
    ' Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    100,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "post",
    'Меню "Фитнес"',
    ' Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    64,
    ".menu .container"
  ).render();
  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Фитнес"',
    ' Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    33,
    ".menu .container"
  ).render();
});
