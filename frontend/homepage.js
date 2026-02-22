//查詢框區
const searchBox = document.querySelector(".inputbox");

//作者字體checkbox
const authorCheckbox = document.querySelectorAll(".author");
const fontCheckbox = document.querySelectorAll(".font");

//顯示區
const initialPage = document.getElementById("initial-page");
const afterSearch = document.getElementById("after-search");
const closeUp = document.getElementById("close-up");

//word1,2,3...
const word123 = document.getElementById("word123");

//查詢的字轉陣列
function getChar() {
  let arr = [];
  const word = searchBox.value.trim();
  if (word !== "") {
    arr.push(word);
  }
  return arr;
}

//回傳checkbox被勾的value
function getChecked(checkboxes) {
  let arr1 = [];
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      arr1.push(checkboxes[i].value);
    }
  }
  return arr1;
}

function collectData() {
  return {
    type: "calligraphy",
    char: getChar(),
    author: getChecked(authorCheckbox),
    font: getChecked(fontCheckbox),
  };
}

//來搜吧
function search() {
  initialPage.style.display = "none";
  // pull input-sys up
  const inputsys = document.getElementById("input-sys");
  inputsys.classList.add("search");

  //有輸入才開始搜尋中
  if (searchBox.value.trim() === "") {
    return;
  }

  //word1,2,3...
  word123.innerHTML = "";
  const words = searchBox.value.trim();
  const chars = words.split("");
  for (let i = 0; i < chars.length; i++) {
    const div = document.createElement("div");
    div.className = "word" + (i + 1);
    div.innerHTML = chars[i];
    word123.appendChild(div);
  }

  /*const requestData = collectData();
    afterSearch.innerHTML = "搜尋中，請稍後......"
    fetch("http://127.0.0.1:8000/search-calligraphy", 
        {
        method: "POST", 
        headers: {
            "Content-Type": "application/json" // 告訴後端，我傳 JSON，而且我JJ很大
        },
        body: JSON.stringify(requestData)    // JS 物件轉 JSON
        }
    )
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        printIt(data);
    })
    .catch(function(){
        afterSearch.innerHTML = "搜尋失敗";
    });*/
  printIt([
    {
      image: "u004E8C_Henry_hardpen.jpg",
      char: "一",
      author: "Henry",
      font: "硬筆書法",
    },
  ]);
}

//顯示結果
function printIt(data) {
  afterSearch.innerHTML = "";
  if (!data || data.length === 0) {
    afterSearch.innerHTML = "無搜尋結果";
    return;
  }

  for (let i = 0; i < data.length; i++) {
    const photo = data[i];
    const div = document.createElement("div");
    div.className = "photo";
    const img = document.createElement("img");
    img.src = photo.image;
    img.className = "photos";

    // img.style.width = "180px";
    // img.style.cursor = "pointer";
    // 這些我從css幫改

    const info = document.createElement("div");
    info.innerHTML =
      "<p>" +
      photo.char +
      "</p>" +
      "<p>" +
      photo.author +
      "</p>" +
      "<p>" +
      photo.font +
      "</p>";

    div.appendChild(img);
    div.appendChild(info);

    afterSearch.appendChild(div);

    // 為什麼print it 需要 info?
    // 我覺得可以把胎放到zoom in
    // id 可以叫做 info

    // 🔥 正確的放大功能
    img.addEventListener("click", function () {
      zoomIn(photo);
    });
  }
}

//放大特寫
function zoomIn(photo) {
  closeUp.style.display = "block";
  closeUp.innerHTML =
    "<div class='close-up-bgd'></div>" +
    "<div class='close-up-content'>" +
    "<img src='" +
    photo.image +
    "'>" +
    "<h3>" +
    photo.char +
    "</h3>" +
    "<p>" +
    photo.author +
    "｜" +
    photo.font +
    "</p>" +
    "</div>";
  const bgd = closeUp.querySelector(".close-up-bgd");
  bgd.addEventListener("click", closeIt);
}
//關
function closeIt() {
  closeUp.style.display = "none";
  closeUp.innerHTML = "";
}

//按ENTER查
searchBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    search();
  }
});

//小龜龜-偵測bug大師
/*⣠⡶⠚⠛⠲⢄⡀
⣼⠁      ⠀⠀⠀⠳⢤⣄
⢿⠀⢧⡀⠀⠀⠀⠀⠀⢈⡇
⠈⠳⣼⡙⠒⠶⠶⠖⠚⠉⠳⣄
⠀⠀⠈⣇⠀⠀⠀⠀⠀⠀⠀⠈⠳⣄
⠀⠀⠀⠘⣆       ⠀⠀⠀⠀⠀⠈⠓⢦⣀
⠀⠀⠀⠀⠈⢳⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠲⢤
⠀⠀⠀⠀⠀⠀⠙⢦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧
⠀⠀⠀⠀⠀⠀⠀⡴⠋⠓⠦⣤⡀⠀⠀⠀⠀⠀⠀⠀⠈⣇
⠀⠀⠀⠀⠀⠀⣸⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡄ 
⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇
⠀⠀⠀⠀⠀⠀⢹⡄⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠃
⠀⠀⠀⠀⠀⠀⠀⠙⢦⣀⣳⡀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠏
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⢦⣀⣀⣀⣀⣠⡴⠚⠁*/
