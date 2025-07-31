// This script would run on article.html

// You would need to have access to the articles array on this page as well.
// For a simple project, you can just duplicate it.
// For a larger project, you might load it from a shared JS file or an API.
import getArticleList from "./articleList.js";
// load on click events
import * as Main from "./main.js";

const articles = getArticleList();

// This function runs when the article.html page has loaded
window.onload = function() {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    // Get the 'idx' value from the URL
    const articleIdx = urlParams.get('idx');

    // Check if the index is valid
    if (articleIdx !== null && articles[articleIdx]) {
        const articleData = articles[articleIdx];
        document.getElementById("title").innerHTML = articleData[0];
        document.getElementById("article").innerHTML = articleData[1];
    } else {
        // Handle cases where the index is missing or invalid
        document.getElementById("title").innerHTML = "Article not found!";
        //document.getElementById("article").innerHTML = "Please go back and select an article.";
    }
};