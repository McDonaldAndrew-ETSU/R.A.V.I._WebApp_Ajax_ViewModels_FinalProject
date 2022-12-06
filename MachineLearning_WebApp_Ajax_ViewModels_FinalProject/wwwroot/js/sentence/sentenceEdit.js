"using strict";

import { readSentence, update } from "./sentenceRepository.js";

const sentenceHeading = document.querySelector("#sentenceHeading");
removeChildren(sentenceHeading);
sentenceHeading.appendChild(document.createTextNode("LOADING..."));


const urlSections = window.location.href.split("/");
const sentenceId = urlSections[5];


await populateSentenceData();

async function populateSentenceData() {
    try {
        const sentence = await readSentence(sentenceId);

        setValue("#Spelling", sentence.spelling); //setValue(elementId, text) is defined below
        setValue("#Meaning", sentence.meaning);

        removeChildren(sentenceHeading); //removeChildren(element) is defined below
        sentenceHeading.appendChild(document.createTextNode(`Edit: "${sentence.spelling}"`));
    }
    catch (e) {
        console.log(e);
        window.location.replace("/Sentence/SentenceIndex");
    }
}


const formSentenceEdit = document.querySelector("#formSentenceEdit");

formSentenceEdit.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formSentenceEdit);
    try {
        await update(formData);

        window.location.replace("/Sentence/SentenceIndex");
    }
    catch (e) {
        console.log(e);
    }
});




function setValue(elementId, text) {
    const element = document.querySelector(elementId);

    element.value = text;
}

function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}