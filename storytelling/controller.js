/*
Communicate with the model and the view modules
*/


//import modules
import Model from './model.js';
import View from './view.js';

const RECOGNITION = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
RECOGNITION.lang = Model.getLang().lang;

let aiRequestInProgress = false;

//handle voice input functions
//this just works i suppose, dont understand it tho, plus event is deprecated
async function handleVoiceInput(event) {
    const USERTEXT = event.results[0][0].transcript;
    const UPDATESTORY = Model.appendLine('Player', USERTEXT)
    View.updateStory(UPDATESTORY);
    View.toggleLoading(true);
    aiRequestInProgress = true;
    const AIRESPONSE = await Model.generateStory(UPDATESTORY + '\nNarrator: ');
    aiRequestInProgress = false;
    View.toggleLoading(false);
    const FINALSTORY = Model.appendLine( AIRESPONSE);
    View.updateStory(FINALSTORY);
    View.speakText(AIRESPONSE, Model.getLang().lang);
}

//handle a language change
function handleLangChange() {
    const SELECTOPTION = View.getLangSelect().selectedOptions[0];
    const NEWLANG = SELECTOPTION.value;
    const NEWLANGNAME = SELECTOPTION.dataset.name;
    Model.setLang(NEWLANG, NEWLANGNAME);
    RECOGNITION.lang = NEWLANG;
}

//handle a stop in speaking
function handleStopSpeaking() {
    View.stopSpeaking();
    if (aiRequestInProgress) {
        View, toggleLoading(false);
        aiRequestInProgress = false;
    }

    const RESETSTORY = Model.resetStory();
    View.updateStory(RESETSTORY);

    setTimeout(() => {
        View.speakText('Story reset! Help me build a story! Start a sentence and I will continue it.',
            Model.getLang().lang)
    }, 500);
}

//handle a pause/resume
function handlePauseResume(e) {
    const NEWSTATE = View.pauseOrResumeSpeaking();
    e.target.textContent = NEWSTATE === 'Pause' ? '⏸️Pause' : '▶️Resume';
}

//initialize
function init() {
    window.speechSynthesis.onvoiceschanged = () => { };
    const INITIALSTORYCONTENT = View.getInitialStoryContent();
    Model.initializeStory(INITIALSTORYCONTENT);
    View.updateStory(Model.getStory());
    setTimeout(() => {
        View.speakText('Story reset! Help me build a story! Start a sentence and I will continue it.',
            Model.getLang().lang)
    }, 500);

    View.getSpeakBtn().onclick = () => {
        try{
            RECOGNITION.start();
        }
        catch (error){
            console.error('Speech recognition error:', error);
        }
    };
    RECOGNITION.onresult = handleVoiceInput;
    RECOGNITION.onerror = (event) => {
        console.error('Speech recognition error:', error.error);
        View.toggleLoading(false);
        aiRequestInProgress = false;
    };

    //if user changes language in the dropdown
    View.getLangSelect().addEventListener('change', handleLangChange);    

    //if user clicks to stop speech
    View.getStopSpeakBtn.onclick = handleStopSpeaking;

    //if user clicks to pause/resume speech
    View.getPauseSpeakBtn().onclick = handlePauseResume;
}

//start
init();