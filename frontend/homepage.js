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
        char: getChar(),
        author: getChecked(authorCheckbox),
        font: getChecked(fontCheckbox)
    };
}

//來搜吧
function search(){
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
const initial_pg = document.getElementById("initial-page");
const afterSearch_pg = document.getElementById("after-search");
const closeUp_pg = document.getElementById("close-up");
function printIt(data){
// 如果你有看到這一航 可能需要同時隱藏
// in style.css, u can use hidden class to hide the element, and toggle it in jsstyle.js when u click the menu button.
// 我打了一點 但是我失敗了
// 對了 there are some mistakes in canva, and i edited it, 要記得加word 1 and word2

    initial_pg.classList.add("hidden");



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
        //放大功能之後做

        
        
        
    }
}

//放大特寫
function zoomIn(picture){
    
}

//按ENTER查
searchBox.addEventListener("keydown", function(e){
    if(e.key==="Enter"){
        search();
    }
})

//改變勾選作者字體
for(let i = 0; i<authorCheckbox.length; i++){
    authorCheckbox[i].addEventListener("change", search);
}
for(let i = 0; i<fontCheckbox.length; i++){
    fontCheckbox[i].addEventListener("change", search);
}