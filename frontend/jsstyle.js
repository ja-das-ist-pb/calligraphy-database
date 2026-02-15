const menu_btn = document.getElementById("mainmenu");
const menu = document.getElementById("menu");
const side_bar = document.getElementById("side-bar");

const filter_btn = document.getElementById("filter-button");
const options = document.getElementById("options");
const author_btn = document.getElementById("author-button");
const font_btn = document.getElementById("font-button");
const authors = document.getElementById("authors");
const fonts = document.getElementById("fonts");

side_bar.classList.toggle("side-bar-hidden");
menu.classList.toggle("hidden");

menu_btn.addEventListener("click", () => {
  side_bar.classList.toggle("side-bar-hidden");
  menu.classList.toggle("hidden");
});

// // 點擊 filter
// filter_btn.addEventListener("click", () => {
//   const isExpanded = filter_btn.classList.toggle("expanded"); // toggle filter 文字

//   if (isExpanded) {
//     // 展開 → 顯示 author & font 按鈕 (icon + 文字)
//     author_btn.style.display = "flex";
//     font_btn.style.display = "flex";
//   } else {
//     // 收回 → 隱藏 author & font 按鈕 & 選項
//     author_btn.style.display = "none";
//     font_btn.style.display = "none";
//     authors.classList.remove("show");
//     fonts.classList.remove("show");

//     // 收起 author & font 的文字（如果有展開）
//     author_btn.classList.remove("expanded");
//     font_btn.classList.remove("expanded");
//   }
// });

// // 點擊 author
// author_btn.addEventListener("click", () => {
//   author_btn.classList.toggle("expanded"); // 展開文字
//   authors.classList.toggle("show");       // 顯示/隱藏作者選項

//   // 互斥: 收起字體選項，但保持 icon + 文字
//   fonts.classList.remove("show");
//   font_btn.classList.remove("expanded");
// });

// // 點擊 font
// font_btn.addEventListener("click", () => {
//   font_btn.classList.toggle("expanded"); // 展開文字
//   fonts.classList.toggle("show");       // 顯示/隱藏字體選項

//   // 互斥: 收起作者選項，但保持 icon + 文字
//   authors.classList.remove("show");
//   author_btn.classList.remove("expanded");
// });
