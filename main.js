const elRegionSelect = document.querySelector(".region-select");
const elWeekInfo = document.querySelector(".week-info");
const elRegionName = document.querySelector(".region-name");
const elDayInfo = document.querySelector(".day-info");

const elNowTime = document.querySelector(".time-now");

// get prayer time
const elFajrTime = document.querySelector(".fajr");
const elSunriseTime = document.querySelector(".sunrise");
const elDhuhrTime = document.querySelector(".dhuhr");
const elAsrTime = document.querySelector(".asr");
const elMaghribTime = document.querySelector(".maghrib");
const elIshaTime = document.querySelector(".isha");

const elCalendarWeeklyRegion = document.querySelector(".region-weekly");
const elCalendarMonthlyyRegion = document.querySelector(".region-monthly");
const elTableWeekly = document.querySelector(".table-weekly");
const elTableMonthly = document.querySelector(".table-monthly");
const elTimeCalendarTemplate = document.querySelector(".calendar-template").content;

// Global fragment
const globalFragment = new DocumentFragment();

setInterval(() => {
    const date = new Date();
    const hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    elNowTime.textContent = `${hours}:${minutes}:${seconds}`
})

function renderTimes(obj){
    elWeekInfo.textContent = obj.weekday;
    elRegionName.textContent = obj.region;
    elDayInfo.textContent = obj.date
    elFajrTime.textContent = obj.times.tong_saharlik;
    elSunriseTime.textContent = obj.times.quyosh;
    elDhuhrTime.textContent = obj.times.peshin;
    elAsrTime.textContent = obj.times.asr;
    elMaghribTime.textContent = obj.times.shom_iftor;
    elIshaTime.textContent = obj.times.hufton;
}

function renderTimeCalendar(arr){
    elTableWeekly.innerHTML = ""
    arr.forEach(item => {
       const templateClone = elTimeCalendarTemplate.cloneNode(true);
        templateClone.querySelector(".week-table").textContent = item.weekday
        templateClone.querySelector(".date-table").textContent = item.date.split(", ")[0].split("/").reverse().join("-")
        templateClone.querySelector(".fajr-time-table").textContent = item.times.tong_saharlik;
        templateClone.querySelector(".sunrise-time-table").textContent = item.times.quyosh;
        templateClone.querySelector(".dhuhr-time-table").textContent = item.times.peshin;
        templateClone.querySelector(".asr-time-table").textContent = item.times.asr;
        templateClone.querySelector(".maghrib-time-table").textContent = item.times.shom_iftor;
        templateClone.querySelector(".isha-time-table").textContent = item.times.hufton;

        globalFragment.appendChild(templateClone);
    });

    elTableWeekly.appendChild(globalFragment);
}
function renderMonthly(arr){
    elTableMonthly.innerHTML = ""
    arr.forEach(item => {
       const templateClone = elTimeCalendarTemplate.cloneNode(true);
        templateClone.querySelector(".week-table").textContent = item.weekday;
        templateClone.querySelector(".date-table").textContent = item.date.split("T")[0];
        templateClone.querySelector(".fajr-time-table").textContent = item.times.tong_saharlik;
        templateClone.querySelector(".sunrise-time-table").textContent = item.times.quyosh;
        templateClone.querySelector(".dhuhr-time-table").textContent = item.times.peshin;
        templateClone.querySelector(".asr-time-table").textContent = item.times.asr;
        templateClone.querySelector(".maghrib-time-table").textContent = item.times.shom_iftor;
        templateClone.querySelector(".isha-time-table").textContent = item.times.hufton;

        globalFragment.appendChild(templateClone);
    });

    elTableMonthly.appendChild(globalFragment);
}


elRegionSelect.addEventListener("click", () => {
    const selectValue = elRegionSelect.value;

    elCalendarWeeklyRegion.textContent = selectValue;
    elCalendarMonthlyyRegion.textContent = selectValue;
    const getNewDate = new Date();
    const getMonth = getNewDate.getMonth()+1;
    getPrayerTime(`https://islomapi.uz/api/present/day?region=${selectValue}`);
    getPrayerCalender(`https://islomapi.uz/api/present/week?region=${selectValue}`);
    getPrayerCalendarMonthly(`https://islomapi.uz/api/monthly?region=${selectValue}&month=${getMonth}`);
});

async function getPrayerTime(url){
    try {
        const res = await fetch(url);
        const data = await res.json();
        renderTimes(data);
    }catch(err){
        console.log(err)
    }
}

async function getPrayerCalender(url){
    try {
        const res = await fetch(url);
        const data = await res.json();
        renderTimeCalendar(data);
    }catch(err){
        console.log(err)
    }
}

async function getPrayerCalendarMonthly(url){
    try {
        const res = await fetch(url);
        const data = await res.json();
        renderMonthly(data)
    }catch(err){
        console.log(err)
    }
}
const getNewDate = new Date();
const getMonth = getNewDate.getMonth()+1;
getPrayerTime("https://islomapi.uz/api/present/day?region=namangan");
getPrayerCalender("https://islomapi.uz/api/present/week?region=namangan");
getPrayerCalendarMonthly(`https://islomapi.uz/api/monthly?region=namangan&month=${getMonth}`)