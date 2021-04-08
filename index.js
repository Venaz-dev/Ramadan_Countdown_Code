console.clear();
let d = new Date();
let month = d.getMonth() + 1;
let day = d.getDate();
let currentHour = d.getHours();
var minutes = 0;
let seconds = 60 - d.getSeconds();
let hours = 0;
let RamadanTimeTable;
let countDownInterval;
let startCountDown = false;

let secondCard1 = document.getElementById("seconds-10");
let secondCard2 = document.getElementById("seconds-0");
let minuteCard1 = document.getElementById("minutes-10");
let minuteCard2 = document.getElementById("minutes-0");
let hourCard1 = document.getElementById("hours-10");
let hourCard2 = document.getElementById("hours-0");

const getRamadanTimeTable = () => {
  fetch(
    `https://api.aladhan.com/v1/calendarByCity?city=Dhaka&country=Bangladesh&method=1&month=${month}&year=2021&tune=1`
  )
    .then((response) => response.json())
    .then((data) => {
      RamadanTimeTable = data;
      calculateTimeLeft(data);
    })
    .catch((error) => console.error(error));
};

const getMinutes = (current, time) => {
  if (current > time) {
    minutes = 60 - current + time;
    if (hours > 0) {
      setTimeout(() => {
        hours -= 1;
      }, 1000);
    }
  } else {
    minutes = time - current;
  }
};
const getHours = (current, time) => {
  if (current > time) {
    hours = 24 - current + time;
  } else {
    hours = time - current;
  }
};

const calculateTimeLeft = (data) => {
  startInterval();
  let nd = new Date();

  let currentMinutes = nd.getMinutes();
  let currentHours = nd.getHours();
  // let currentHours = 4;
  // let currentMinutes = 20;

  seconds = 60 - nd.getSeconds();
  let nextSehri = data.data[day].timings.Imsak.split(" ");
  nextSehri = nextSehri[0].split(":");

  let sehri = data.data[day - 1].timings.Imsak.split(" ");
  sehri = sehri[0].split(":");
  let ifter = data.data[day - 1].timings.Sunset.split(" ");
  ifter = ifter[0].split(":");

  if (currentHours <= parseInt(sehri[0])) {
    if (currentHours !== parseInt(sehri[0])) {
      getHours(currentHours, parseInt(sehri[0]));

      getMinutes(currentMinutes, parseInt(sehri[1]));
    } else {
      if (currentMinutes <= parseInt(sehri[1])) {
        getHours(currentHours, parseInt(sehri[0]));

        getMinutes(currentMinutes, parseInt(sehri[1]));
      } else {
        getHours(currentHours, parseInt(ifter[0]));
        getMinutes(currentMinutes, parseInt(ifter[1]));
      }
    }
  }
  if (currentHours > parseInt(sehri[0]) && currentHours <= parseInt(ifter[0])) {
    if (currentHours == parseInt(ifter[0])) {
      if (currentMinutes <= parseInt(ifter[1])) {
        getHours(currentHours, parseInt(ifter[0]));
        getMinutes(currentMinutes, parseInt(ifter[1]));
      } else {
        getHours(currentHours, parseInt(nextSehri[0]));
        getMinutes(currentMinutes, parseInt(nextSehri[1]));
      }
    } else {
      getHours(currentHours, parseInt(ifter[0]));
      getMinutes(currentMinutes, parseInt(ifter[1]));
    }
    return;
  }

  if (currentHours > parseInt(ifter[0])) {
    getMinutes(currentMinutes, parseInt(nextSehri[1]));
    getHours(currentHours, parseInt(nextSehri[0]));
  }
};

const animate = (element) => {
  var tl = new TimelineMax();
  TweenMax.to(element, 0.6, {
    delay: 0.2,
    rotationX: "+=180",
    ease: Power3.easeOut,
  });

  TweenMax.to(element.firstElementChild, 0.2, {
    rotationX: "+=180",
    delay: 0.8,
    ease: Power3.easeInOut,
  });
};

function countDown() {
  if (seconds == 0 && minutes == 0 && hours == 0) {
    animateSeconds();
    clearInterval(countDownInterval);
    startCountDown = false;
    setTimeout(() => {
      calculateTimeLeft(RamadanTimeTable);
    }, 2000);
    return;
  }

  animateSeconds();
  animateMinutes();

  if (hours < 10) {
    hourCard1.firstElementChild.innerHTML = "0";
    hourCard2.firstElementChild.innerHTML = hours.toString()[0];
  } else {
    hourCard1.firstElementChild.innerHTML = hours.toString()[0];
    hourCard2.firstElementChild.innerHTML = hours.toString()[1];
  }

  if (seconds <= 0) {
    animate(secondCard2);
    animate(secondCard1);
    if (minutes > 0) {
      minutes -= 1;
      seconds = 60;
      animate(minuteCard2);
    } else {
      if (hours > 0) {
        hours -= 1;
        minutes = 60;
        animate(hourCard2);
      }
      if (hours % 10 == 9 && hours !== 0) {
        animate(hourCard1);
      }
    }

    if (minutes % 10 == 9 && minutes !== 0) {
      animate(minuteCard1);
    }
  }
}

const animateSeconds = () => {
  if (seconds < 10) {
    secondCard1.firstElementChild.innerHTML = "0";
    secondCard2.firstElementChild.innerHTML = seconds.toString()[0];
  } else {
    secondCard2.firstElementChild.innerHTML = seconds.toString()[1];
    secondCard1.firstElementChild.innerHTML = seconds.toString()[0];
  }
  if (seconds > 0) {
    seconds--;
    animate(secondCard2);
    if (seconds % 10 == 9) {
      animate(secondCard1);
    }
  }
};

const animateMinutes = () => {
  if (minutes < 10) {
    minuteCard1.firstElementChild.innerHTML = "0";
    minuteCard2.firstElementChild.innerHTML = minutes.toString()[0];
  } else {
    minuteCard1.firstElementChild.innerHTML = minutes.toString()[0];
    minuteCard2.firstElementChild.innerHTML = minutes.toString()[1];
  }
};

const entryAnimation = () => {
  if (currentHour > 17 || currentHour < 7) {
    document.getElementById("ramadan-countdown").style.background =
      "linear-gradient(180deg, rgba(34, 34, 34, 0.8) 50%, rgba(85, 85, 85, 0.8) 74%), url(./assets/banner-bg.png)";
    let counter = document.querySelectorAll(".counter");
    for (i = 0; i < counter.length; i++) {
      counter[i].style.backgroundColor = "#333333";
    }
    let seperator = document.querySelectorAll(".seperator");
    for (i = 0; i < seperator.length; i++) {
      seperator[i].style.backgroundColor = "unset";
    }
  }

  let tl = gsap.timeline({
    defaults: {
      duration: 0.4,
      ease: Back.easeOut.config(2),
      opacity: 0,
    },
  });

  tl.from(
    "#ramadan-countdown",
    {
      delay: 1,
      scale: 0.2,
      transformOrigin: "center",
    },
    "=.2"
  )
    .from(".heading-text", {
      scaleY: 0,
      transformOrigin: "top",
    })
    .from(".logo", {
      scaleX: 0,
      transformOrigin: "left",
    })
    .from(".objects", {
      scaleY: -100,
      transformOrigin: "top",
    })
    .from(".body-text", {
      scaleX: 0,
      transformOrigin: "left",
    })
    .from(".timer-container", {
      scale: 0.2,
      transformOrigin: "center",
    });
};

const startInterval = () => {
  countDownInterval = setInterval(() => {
    countDown();
    startCountDown = true;
  }, 1000);
};

entryAnimation();

getRamadanTimeTable();
