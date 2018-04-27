var screenbottom = $(window).height();
var containerpos = 50;
var upDown = false;

var lightText = [200, 200, 200];
var darkText = [25, 25, 25];
var lightBG = [253, 125, 1];
//200, 165, 29 Golden Sunrise
//253,125,1 Sunrise Orange
var darkBG = [25, 25, 112];
// 25, 25, 112 Midnight Blue

var displayTime = "";
var theRatio = 0;

var txtIsdark;

var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

var month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

$(window).load(function() {
  timeLoop();
});

function timeLoop() {
  var today = new Date();
  // "September 06, 1983 00:15:00"

  $("#theTime").html(makeTime(today));

  $("#theDay").html(makeDay(today));

  moveTime();

  document.body.style.backgroundColor = slowFade(theRatio);
  var bgColor = RGBtoArray(document.body.style.backgroundColor);
  document.body.style.color = textContrast(bgColor);

  var t = setTimeout(function() {
    document.title = displayTime;
    timeLoop();
  }, 1000);
}

function moveTime() {
  if (!upDown) {
    containerpos -= 0.25;
  } else {
    containerpos += 0.25;
  }
  if (containerpos <= 0 || containerpos >= 256) {
    upDown = !upDown;
  }
  $("#theContainer").css("top", containerpos);
}

function makeTime(today) {
  var halfDay = 12;

  //console.log(today);
  var hour = addZero(today.getHours());
  var minute = addZero(today.getMinutes());

  var ext = "";
  var timePlus = hour + ":" + minute;

  if (hour >= 12) {
    ext = "PM";
    if (hour !== 12) {
      hour = addZero(hour - 12);
      timePlus = hour + ":" + minute;
      theRatio = toDecimaltime(timePlus) / halfDay;
    } else {
      theRatio = toDecimaltime("00:" + minute) / halfDay;
    }
  } else {
    ext = "AM";
    theRatio = Math.abs((toDecimaltime(timePlus) - halfDay) / halfDay);
    if (hour === "00") {
      timePlus = "12:" + minute;
    }
  }

  displayTime = timePlus + ext;

  return displayTime;
}

function makeDay(today) {
  theDaytxt =
    weekday[today.getDay()] +
    ", " +
    month[today.getMonth()] +
    " " +
    nth(today.getDate());

  return theDaytxt;
}

function addZero(i) {
  if (i < 10 && i.toString().charAt(0) !== "0") {
    i = "0" + i;
  } else if (i === 0) {
    i = "00";
  }
  return i;
}

function nth(d) {
  if (d > 3 && d < 21) {
    return d + "th";
  }
  switch (d % 10) {
    case 1:
      return d + "st";

    case 2:
      return d + "nd";

    case 3:
      return d + "rd";

    default:
      return d + "th";
  }
}

function textContrast(rgb) {
  var contrastText = Math.round(
    (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) /
      1000
  );

  if (contrastText > 125) {
    txtIsdark = true;
    return "rgb(" + darkText[0] + "," + darkText[1] + "," + darkText[2] + ")";
  } else {
    txtIsdark = false;
    return (
      "rgb(" + lightText[0] + "," + lightText[1] + "," + lightText[2] + ")"
    );
  }
}

function slowFade(ratio) {
  var difference;
  var newColor = [];
  for (var i = 0; i < lightBG.length; i++) {
    difference = darkBG[i] - lightBG[i];
    newColor.push(Math.floor(parseInt(lightBG[i], 10) + difference * ratio));
  }

  return "rgb(" + newColor[0] + "," + newColor[1] + "," + newColor[2] + ")";
}

function RGBtoArray(rgbColor) {
  return rgbColor.substring(4, rgbColor.length - 1).split(",");
}

function toDecimaltime(time) {
  var hoursMinutes = time.split(/[.:]/);
  var hours = parseInt(hoursMinutes[0], 10);
  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return hours + minutes / 60;
}
