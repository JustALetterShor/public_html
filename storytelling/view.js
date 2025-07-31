/*
View
Handle user interactions ig
*/


//get all elements from the DOM
const STORYDIV = document.getElementById('story');
const SPEAKBTN = document.getElementById('speakBtn');
const STOPSPEAKBTN = document.getElementById('stopSpeakBtn');
const PAUSESPEAKBTN = document.getElementById('pauseSpeakBtn');
const LANGSELECT = document.getElementById('languageSelect');
const LOADINGDIV = document.getElementById('loading');
const passwordInp = document.getElementById('password');

//get API key
function getKey(){
    return passwordInp.value;
}

//update gemini story
function updateStory(text) {
    if (STORYDIV) {
        STORYDIV.textContent = text;
    }
}

//show loading message
function toggleLoading(show) {
    if (LOADINGDIV) {
        LOADINGDIV.style.display = show ? 'block' : 'none';
    }
}

//get stop button
function getStopSpeakBtn() {
    return STOPSPEAKBTN;
}

//get pause button
function getPauseSpeakBtn() {
    return PAUSESPEAKBTN;
}

//get speak button
function getSpeakBtn() {
    return SPEAKBTN;
}

//get Language select
function getLangSelect() {
    return LANGSELECT;
}

//get text from story box
function getInitialStoryContent() {
    return STORYDIV ? STORYDIV.textContent.trim(): 'Narrator: help me build a story! Start with a sentence and I will continue it.';
}

//speak?  ngl i don't understand this code at all, should have used some different variable names
function speakText(text, lang) {
    try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        const voices = speechSynthesis.getVoices();

        //check if voice is available
        if (voices.length == 0) {
            setTimeout(() => speakText(text, lang), 100);
            return;
        }

        const voice = voices.find(v => v.lang.startsWith(lang));
        if (voice) {
            utterance.voice = voice;
        }
        window.speechSynthesis.speak(utterance);
    }
    catch (error) {
        console.error('Speech synthesis error:', error);
    }
}

//stop speech synthesis
function stopSpeaking() {
    window.speechSynthesis.cancel();
}

//pause or resume speech synthesis
function pauseOrResumeSpeaking() {
    if (window.speechSynthesis.speaking) {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            return 'Pause';
        } else {
            window.speechSynthesis.pause();
            return 'Resume';

        }
    }
    return 'Pause';
}

//allow others to use module
export default {
    updateStory,
    toggleLoading,
    getStopSpeakBtn,
    getPauseSpeakBtn,
    getSpeakBtn,
    getInitialStoryContent,
    speakText,
    stopSpeaking,
    pauseOrResumeSpeaking, 
    getLangSelect,
    getKey

}