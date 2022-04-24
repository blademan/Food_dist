window.addEventListener("DOMContentLoaded", () => {
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

  // TIMER

  const deadline = "2022-05-21";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
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

  function addZero(num) {
    return num >= 0 && num < 10 ? `0${num}` : num;
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");
    timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = addZero(t.days);
      hours.innerHTML = addZero(t.hours);
      minutes.innerHTML = addZero(t.minutes);
      seconds.innerHTML = addZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
        days.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";
      }
    }
  }

  setClock(".timer", deadline);
});
