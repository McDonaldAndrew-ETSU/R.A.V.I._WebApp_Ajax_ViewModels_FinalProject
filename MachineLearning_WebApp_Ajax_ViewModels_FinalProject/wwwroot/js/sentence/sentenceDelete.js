"using strict";
//"Preserve logs" in Chrome dev tools


import { readSentence, deleteSentence } from "./sentenceRepository.js";

const sentenceHeading = document.querySelector("#sentenceHeading");
removeChildren(sentenceHeading); //removeChildren(element) is defined below
sentenceHeading.appendChild(document.createTextNode("LOADING..."));


const urlSections = window.location.href.split("/");
const sentenceId = urlSections[5];


await populateSentenceData(); //populateSentenceData() is defined below

async function populateSentenceData() {
    try {
        const sentence = await readSentence(sentenceId);

        setText("#sentenceSpelling", sentence.spelling); //setText(elementId, text) is defined below

        setValue("#id", sentence.spelling); //setValue(elementId, text) is defined below


        removeChildren(sentenceHeading);
        sentenceHeading.appendChild(document.createTextNode("Sentence Delete"));
    }
    catch(e) {
        console.log(e);
        window.location.replace("/Sentence/SentenceIndex")
    }
}


const formSentenceDelete = document.querySelector("#formSentenceDelete");

formSentenceDelete.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formSentenceDelete);

    try {
        await deleteSentence(formData.get("id"));

        window.location.replace("/Sentence/SentenceIndex");
    }
    catch (e) {
        console.log(e);
    }
});



function setText(elementId, text) {
    const element = document.querySelector(elementId);

    element.appendChild(document.createTextNode(text));
}

function setValue(elementId, text) {
    const element = document.querySelector(elementId);

    element.value = text;
}

function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}