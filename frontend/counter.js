const BASE_URL = "";
const title = document.getElementById("title");
const today = document.getElementById("today");
const yesterday = document.getElementById("yesterday");
const week = document.getElementById("week");
const month = document.getElementById("month");
const year = document.getElementById("year");
const total = document.getElementById("total");

const updateele = [today, yesterday, week, month, year, total];

async function search() {
    try {
        const response = await fetch(`${BASE_URL}/visit/status`);
        const data = await response.json()
        updateele.forEach(function(ele){
            ele.innerText = data[ele.id] ?? "---";
        })
    } catch(err) {
        console.log("造訪人數讀取失敗 : ", err)
    }

    // test
    console.log(data)
}

search();