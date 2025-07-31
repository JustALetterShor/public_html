/*
Model
Handle data, basically
communicate with gemini
*/
 import View from './view.js';

//initialize vars
let story = '';
let initialStory = '';
let currentLang = 'en-US';
let currentLangName = 'english';





//talk with gemini to generate a story
async function generateStory(prompt) {
    //gemini api vars
    const GEMINI_API_KEY = View.getKey();
    if (!GEMINI_API_KEY) {
        alert('Your key is empty. Add one. Or two.')
        return;
    }
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
    const BODY = {
        contents: [{
            parts: [{
                text: `Continue the story in ${currentLang}:\n ${prompt}`

            }]
        }]
    };

    //wait for a response
    const RESPONSE = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(BODY)
    });
    const DATA = await RESPONSE.json();
    return DATA.candidates?.[0]?.content?.parts?.[0]?.text || '(no response)';
}

//add on to the story
function appendLine(role, text){
    story += `\n${role} ${text}`
    return story;
}

//get the story
function getStory(){
    return story;
}

//get the language
function getLang(){
    return {lang: currentLang, langName: currentLangName};
}

//set the language
function setLang(lang, langName){
    currentLang = lang;
    currentLangName = langName;
}

//reset story
function resetStory(){
    story = initialStory;
    return story;
}

//initialize story
function initializeStory(initialText){
    story = initialText;
    initialStory = initialText;
    return story;
}

//export functions
export default{
    generateStory,
    appendLine,
    getStory,
    getLang,
    setLang,
    resetStory,
    initializeStory
}