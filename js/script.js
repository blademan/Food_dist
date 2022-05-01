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

  //FORMS
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.loading;
      form.appendChild(statusMessage);

      const request = new XMLHttpRequest();

      request.open("POST", "server.php");

      request.setRequestHeader(
        "Content-type",
        "application/json; charset=utf-8"
      );

      const formData = new FormData(form);

      const object = {};

      formData.forEach(function (value, key) {
        object[key] = value;
      });
      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }
});
