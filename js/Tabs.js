export default function Tabs() {
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
