//import the article list
import getArticleList from "./articleList.js";

const articles = getArticleList();


//declare vars
let articleIdx = 0;

//switch to the cheatsheet page
function cheatsheet() {
    window.location.href = "cheatsheet.html";
}

//switch to a random article
function random() {
    articleIdx = Math.floor(Math.random() * articles.length);
    switchArticle(articleIdx);
}

//switch to the main page
function main() {
    window.location.href = "main.html";
}

//switch articles
function switchArticle(idx) {
    window.location.href = `article.html?idx=${idx}`;
}

// Since this is a module, functions are not global by default.
// To make them callable from HTML (e.g., onclick="random()"),
// they must be explicitly attached to the window object.
window.cheatsheet = cheatsheet;
window.random = random;
window.main = main;
window.switchArticle = switchArticle;

export default {random, cheatsheet, main, switchArticle};