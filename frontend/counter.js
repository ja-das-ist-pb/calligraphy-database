const BASE_URL = "http://192.168.0.69:3333";
const title = document.getElementById("title");
const today = document.getElementById("today");
const yesterday = document.getElementById("yesterday");
const week = document.getElementById("week");
const month = document.getElementById("month");
const year = document.getElementById("year");
const online = document.getElementById("online");
const total = document.getElementById("total");

const updataele = [today, yesterday, week, month, year, online, total];


function clear() {
    updateele.forEach(function(ele) {
        ele.innerText = "";
    });
}

async function search() {
    const response = await fetch(`${BASE_URL}/counter`);
    const data = await JSON.parse(response.json());
    updateele.forEach(function(ele){
        ele.innerText = data.string(ele);
    })
}

clear();
search();