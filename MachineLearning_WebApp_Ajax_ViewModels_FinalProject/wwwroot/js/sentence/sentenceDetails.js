"using strict";

import { readSentence } from "./sentenceRepository.js";

const sentenceHeading = document.querySelector("#sentenceHeading");
removeChildren(sentenceHeading);
sentenceHeading.appendChild(document.createTextNode("LOADING..."));

const urlSections = window.location.href.split("/");
//console.log(urlSections); helps find the index for the Id of the object
const sentenceId = urlSections[5];


await populateSentenceData();

async function populateSentenceData() {
    try {
        const sentence = await readSentence(sentenceId);

        setText("#sentenceSpelling", sentence.spelling); //setText(elementId, text) is defined below
        setText("#sentenceMeaning", sentence.meaning);

        removeChildren(sentenceHeading);
        sentenceHeading.appendChild(document.createTextNode(`Details for: "${sentence.spelling}"`));
    }
    catch (e) {
        console.log(e);
        window.location.replace("/Sentence/SentenceIndex");
    }
}

function setText(elementId, text) {
    const element = document.querySelector(elementId);

    element.appendChild(document.createTextNode(text));
}


const div = document.querySelector("#div");
div.appendChild(createEditLink(sentenceId)); //createDivEditLink(id) defined below

function createEditLink(id) {
    const td = document.createElement("td");

    td.appendChild(document.createTextNode(" | "));
    td.appendChild(createLink(`/Sentence/SentenceEdit/${id}`, "Edit")); //creatLink(url, text) defined below

    return td;
}

function createLink(url, text) {
    const a = document.createElement("a");

    a.setAttribute("href", url);
    a.appendChild(document.createTextNode(text));

    return a;
}


function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}