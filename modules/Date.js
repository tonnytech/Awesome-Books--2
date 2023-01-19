import { DateTime } from "./luxon.js";

const currentTime = () => {
  const date = document.getElementById("date");

  setInterval(() => {
    const now = DateTime.now();
    date.innerHTML = now.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  }, 1000);
};

export default { currentTime };
