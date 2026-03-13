document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.querySelector(".inputbox");
  const authorCheckbox = document.querySelectorAll('input[name="author"]');
  const fontCheckbox = document.querySelectorAll('input[name="font"]');
  const initialPage = document.getElementById("initial-page");
  const afterSearch = document.getElementById("after-search");
  const closeUp = document.getElementById("close-up");
  const message = document.getElementById("message");
  const sorry = document.getElementById("sorry");

  console.log(document.getElementById("photo-con"));

  searchBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      search();
    }
  });
  //英轉中
  const calligrapher ={
    "WangXiZhi": "王羲之",
    "MiFu": "米芾",
    "SuShi": "蘇軾",
    "LiSi": "李斯",
    "DengShiru": "鄧石如",
    "Henry": "曾子恆",
    "Paul": "陳葆謙"
  }
  const script = {
    "regular": "楷書",
    "running": "行書",
    "smallseal": "小篆",
    "clerical": "隸書",
    "cursive": "草書",
    "hardpen": "硬筆書法"
  }

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
      search_type: "calligraphy",
      char: getChar(),
      author: getChecked(authorCheckbox),
      font: getChecked(fontCheckbox),
    };
  }

  //來搜吧
  function search() {
    //有輸入才開始搜尋中
    if (searchBox.value.trim() === "") {
      return;
    }
    initialPage.style.display = "none";
    // pull input-sys up
    const inputsys = document.getElementById("input-sys");
    const hidden_space = document.getElementById("hidden-space");
    inputsys.classList.add("search");
    hidden_space.classList.add("show");
    
    const words = searchBox.value.trim();
    const chars = words.split("");
    for (let i = 0; i < chars.length; i++) {
      const div = document.createElement("div");
      div.className = "word" + (i + 1);
      div.innerHTML = chars[i];
    }

    const requestData = collectData();
    console.log(requestData);
    message.innerText = "搜尋中，請稍後......";
    fetch("http://127.0.0.1:8000/search-calligraphy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 告訴後端，我傳 JSON，而且我JJ很大
      },
      body: JSON.stringify(requestData), // JS 物件轉 JSON
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // test
        console.log("data: ", data);

        printIt(data);
      })
      .catch(function (err) {
        console.log(err);
        afterSearch.innerHTML = "搜尋失敗";
      });
  }

  //顯示結果
  //有點亂:(  整理一下: data:整個物件、myKeys:搜尋的字、char:單個字、photos:這個字的所有圖片陣列、photo:圖片資料
  function printIt(data) {
    const photoCon = document.getElementById("photo-con");
    const wordCon = document.getElementById("word-con");
    photoCon.innerHTML = "";

    // let hasPhoto = false;
    // //取得所有的鍵，就是搜尋的字
    // for(let i = 0; i<myKeys.length(); i++){
    //   if(data[myKeys[i]].length()>0){
    //     hasPhoto = true;
    //     break;
    //   }
    // }

    if (!data) {
      afterSearch.innerHTML = "很抱歉，我們沒有您搜尋的字:(";
      return;
    }

    const myKeys = Object.keys(data);
    let hasPhoto = false;
    let noPhoto = [];

    for (let i = 0; i < myKeys.length; i++) {
      let char = myKeys[i]; //梅
      let photos = data[char]; //梅的所有照片
      //小小字
      const word123 = document.createElement("div");
      word123.className = "word123";
      word123.innerText = char;
      wordCon.appendChild(word123);
      
      if(!photos || photos.length === 0) {
        noPhoto.push(char);
        continue;
      }
      
      for (let j = 0; j < photos.length; j++) {
        const photo = photos[j];

        const div = document.createElement("div");
        div.className = "photo";

        const img = document.createElement("img");
        img.src = "http://127.0.0.1:8000" + photo.path;
        img.className = "photos";

        // test
        console.log("photo ok");

        
        div.appendChild(img);
        photoCon.appendChild(div);

        hasPhoto = true;

        img.addEventListener("click", function () {
          photo.char = char;
          zoomIn(photo);
        });
      }
    }

    for(let i = 0; i<noPhoto.length; i++){
      const sorryele = document.createElement("sorry");
      sorryele.innerText = "很抱歉，我們目前沒有「" + noPhoto[i] + "」字\n";
      sorry.appendChild(sorryele);
    }

    message.innerText = "";
  }

  //放大特寫
  function zoomIn(photo) {
    closeUp.style.display = "block";

    closeUp.innerHTML =
      "<div class='close-up-bgd'></div>" +
      "<div class='close-up-content'>" +
      "<img src='" +"http://127.0.0.1:8000"+photo.path+"'>" +
      "<h3 style='text-align: center;'>"+photo.char +"</h3>" + 
      "<p style='text-align: center;'>"+calligrapher[photo.author]+"</p>" +
      "<p style='text-align: center;'>"+script[photo.font]+"</p>" +
      "</div>";
    const bgd = closeUp.querySelector(".close-up-bgd");
    bgd.addEventListener("click", closeIt);
  }
  //關
  function closeIt() {
    closeUp.style.display = "none";
    closeUp.innerHTML = "";
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
