//查詢框區
const searchBox = document.querySelector(".inputbox");

//作者字體checkbox
const authorCheckbox = document.querySelectorAll(".author");
const fontCheckbox = document.querySelectorAll(".font");

//顯示區
const initialPage = document.getElementById("initial-page");
const afterSearch = document.getElementById("after-search");
const closeUp = document.getElementById("close-up");

//查詢的字轉陣列
function getChar(){
    let arr=[];
    const word = searchBox.value.trim();
    if(word!==""){
        arr.push(word);
    }
    return arr;
}

//回傳checkbox被勾的value
function getChecked(checkboxes){
    let arr1=[];
    for(let i = 0; i<checkboxes.length; i++){
        if(checkboxes[i].checked){
            arr1.push(checkboxes[i].value);
        }
    }
    return arr1;
}

function collectData(){
    return {
        type: "calligraphy",
        char: getChar(),
        author: getChecked(authorCheckbox),
        font: getChecked(fontCheckbox)
    };
}

//來搜吧
function search(){
    initialPage.style.display = "none";
    //有輸入才開始搜尋中
    if(searchBox.value.trim() === ""){
        return;
    }
    const requestData = collectData();
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
    });
}

//顯示結果
function printIt(data){
    afterSearch.innerHTML = "";
    if(!data || data.length===0){
        afterSearch.innerHTML = "無搜尋結果";
        return;
    }
    for(let i = 0; i<data.length; i++){
        const photo = data[i];
        const div = document.createElement("div");
        div.className = "photo";
        div.innerHTML ="<img src='" + photo.image + "'>" +"<p>" + photo.char + "｜" + photo.author + "｜" + photo.font + "</p>";
        afterSearch.appendChild(div);
        //放大功能
        div.addEventListener("click", function(){
            zoomIn(photo);
        });
    }
}

//放大特寫
function zoomIn(photo){
    closeUp.innerHTML ="<div class='close-up-bgd'></div>" +"<div class='close-up-content'>" +"<img src='" + photo.image + "'>" +"<h3>" + photo.char + "</h3>" +
    "<p>" + photo.author + "｜" + photo.font + "</p>" + "</div>";
    const bgd = closeUp.querySelector(".close-up-bgd");
    bgd.addEventListener("click", closeIt);
}
//關
function closeIt(){
    closeUp.innerHTML = "";
}

//按ENTER查
searchBox.addEventListener("keydown", function(e){
    if(e.key==="Enter"){
        search();
    }
})