var screenbottom = $(window).height();
var containerpos = 70;
var upDown = false;

var lightText = [200, 200, 200];
var darkText = [25, 25, 25];
var lightBG = [253, 125, 1];
//200, 165, 29 Golden Sunrise
//253,125,1 Sunrise Orange
var darkBG = [25, 25, 112];
// 25, 25, 112 Midnight Blue

var halfDay = 12;

var txtIsdark;

var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function startTime() {
    var today = new Date();
    // "September 06, 1983 00:15:00"
    var hour = addZero(today.getHours());
    var minute = addZero(today.getMinutes());
    var theRatio = 0;
    var ext = "";
    var timePlus = hour + ":" + minute;
	
    if (hour >= 12) {
        ext = "PM";
        if (hour !== 12) {
            hour = addZero(hour - 12);
            timePlus = hour + ":" + minute;
            theRatio = (toDecimaltime(timePlus) / halfDay);
        } else {
            theRatio = (toDecimaltime("00:" + minute) / halfDay);
        }
    } else {
        ext = "AM";
        theRatio = Math.abs(((toDecimaltime(timePlus) - halfDay) / halfDay));
        if (hour === "00") {
            timePlus = "12:" + minute;
        }
    }

    displayTime = timePlus + ext;
	
    $("#theTime").html(displayTime);

    theDay = makeDay(today);
    $("#theDay").html(theDay);
    $("#theDay").bigText();

	if (!upDown) {
        containerpos -= .5;
    } else {
        containerpos += .5;
    }
	
    if (containerpos <= 68 || containerpos >= 344) {
        upDown = !upDown;
		//console.log(containerpos + " - " + upDown);
    }
	
    $("#theContainer").css("top", containerpos);

    document.body.style.backgroundColor = slowFade(theRatio);
    var bgColor = RGBtoArray(document.body.style.backgroundColor);
    document.body.style.color = textContrast(bgColor);

    var t = setTimeout(function() {
        document.title = displayTime;
		startTime();
    }, 500);
	
	
	
	
}

$(window).load(function() {

    startTime();
	});

function toDecimaltime(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return (hours + minutes / 60);
}


function makeDay(today) {
    theDaytxt = weekday[today.getDay()] + ", " + month[today.getMonth()] + " " + nth(today.getDate());
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
        return (d + "th")
    }
    switch (d % 10) {
        case 1:
            return (d + "st");
        case 2:
            return (d + "nd");
        case 3:
            return (d + "rd");
        default:
            return (d + "th");
    }
}

function textContrast(rgb) {
    var contrastText = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);

    if (contrastText > 125) {
        txtIsdark = true;
        return "rgb(" + darkText[0] + "," + darkText[1] + "," + darkText[2] + ")";
    } else {
        txtIsdark = false;
        return "rgb(" + lightText[0] + "," + lightText[1] + "," + lightText[2] + ")";
    }
}

function slowFade(ratio) {
    var difference;
    var newColor = [];
    for (var i = 0; i < lightBG.length; i++) {
        difference = darkBG[i] - lightBG[i];
        newColor.push(Math.floor(parseInt(lightBG[i], 10) + difference * ratio));
    }
    return "rgb(" + newColor + ")";
}

function RGBtoArray(rgbColor) {
    return rgbColor.substring(4, rgbColor.length - 1).split(",");
}