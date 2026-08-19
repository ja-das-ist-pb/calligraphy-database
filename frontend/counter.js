const BASE_URL = "";
const title = document.getElementById("title");
const today = document.getElementById("today");
const yesterday = document.getElementById("yesterday");
const week = document.getElementById("week");
const month = document.getElementById("month");
const year = document.getElementById("year");
const total = document.getElementById("total");

const updataele = [today, yesterday, week, month, year, total];

async function search() {
    const response = await fetch(`${BASE_URL}/visit/status`);
    const data = await JSON.parse(response.json());
    updateele.forEach(function(ele){
        ele.innerText = data.string(ele);
    })

    // test
    console.log(data)
}

search();