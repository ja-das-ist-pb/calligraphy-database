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
  //去重複
  for (let i = 0; i < word.length; i++) {
    let a = word[i];
    let repeated = false;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] === a) {
        repeated = true;
        break;
      }
    }
    if (!repeated) {
      arr.push(a);
    }
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
  //word123.innerHTML = "";
  const words = searchBox.value.trim();
  const chars = words.split("");
  for (let i = 0; i < chars.length; i++) {
    const div = document.createElement("div");
    div.className = "word" + (i + 1);
    div.innerHTML = chars[i];
    //word123.appendChild(div);
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
  printIt({
    一: [
       {
         author: "Henry",
         font: "hardpen",
         path: "image/u004E00_Henry_hardpen.jpg",
         creation: null
       }
    ],
  });
}

//顯示結果
//有點亂:(  整理一下: data:整個物件、myKeys:搜尋的字、char:單個字、photos:這個字的所有圖片陣列、photo:圖片資料
function printIt(data) {
  const photoCon = document.getElementById("photo-con");
  photoCon.innerHTML = "";
  if (!data || Object.keys(data).length === 0) {
    afterSearch.innerHTML = "無搜尋結果";
    return;
  }
  //取得所有的鍵，就是搜尋的字
  const myKeys = Object.keys(data);

  for (let i = 0; i < myKeys.length; i++) {
    let char = myKeys[i]; //梅
    let photos = data[char]; //梅的所有照片
    for (let j = 0; j < photos.length; j++) {
      const photo = photos[j];

      const div = document.createElement("div");
      div.className = "photo";

      const img = document.createElement("img");
      img.src = photo.path;
      img.className = "photos";

      const info = document.createElement("div");
      info.innerHTML =
        "<p>" + char + "</p>" +
        "<p>" + photo.author + "</p>" +
        "<p>" + photo.font + "</p>";

      div.appendChild(img);
      div.appendChild(info);

      photoCon.appendChild(div);

      // 為什麼print it 需要 info?
      // 我覺得可以把胎放到zoom in
      // id 可以叫做 info

      
      img.addEventListener("click", function () {
        zoomIn(photo);
      });
      console.log(data);
      console.log(photo.path);
    }
  }
}

//放大特寫
function zoomIn(photo) {
  closeUp.style.display = "block";
  closeUp.innerHTML =
    "<div class='close-up-bgd'></div>" +
    "<div class='close-up-content'>" +
    "<img src='" +
    photo.path +
    "'>" +
    "<h3>" +
    photo.char +
    "</h3>" +
    "<p>" +
    photo.author +
    "</p>" +
    "<p>" +
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
