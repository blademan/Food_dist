export default class Timer {
  constructor(deadline) {
    this.deadline = deadline;
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
    const timer = document.querySelector(".timer"),
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
