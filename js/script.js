import modal from "./Modal.js";
import MenuCard from "./MenuCard.js";
import tabs from "./Tabs.js";
import Timer from "./Timer.js";
import form from "./Form.js";
window.addEventListener("DOMContentLoaded", () => {
  modal();
  tabs();
  form();
  let myTimer = new Timer("2022-05-23", ".timer");

  //GET MENU CARDS
  async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }
  getResource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
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
