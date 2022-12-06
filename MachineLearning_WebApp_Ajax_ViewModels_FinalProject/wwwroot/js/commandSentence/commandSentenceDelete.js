"using strict";
//"Preserve logs" in Chrome dev tools


import { read, deleteCommandSentence } from "./commandSentenceRepository.js";

const commandSentenceHeading = document.querySelector("#commandSentenceHeading");
removeChildren(commandSentenceHeading); //removeChildren(element) is defined below
commandSentenceHeading.appendChild(document.createTextNode("LOADING..."));


const urlSections = window.location.href.split("/");
const commandSentenceId = urlSections[5];


await populateSentenceData(); //populateSentenceData() is defined below

async function populateSentenceData() {
    try {
        const commandSentence = await read(commandSentenceId);

        setText("#csId", commandSentence.id); //setText(elementId, text) is defined below

        setValue("#id", commandSentence.id); //setValue(elementId, text) is defined below


        removeChildren(commandSentenceHeading);
        commandSentenceHeading.appendChild(document.createTextNode("CommandSentence Delete"));
    }
    catch (e) {
        console.log(e);
        window.location.replace("/CommandSentence/CommandSentenceDetailedIndex")
    }
}


const formCommandSentenceDelete = document.querySelector("#formCommandSentenceDelete");

formCommandSentenceDelete.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formCommandSentenceDelete);

    try {
        await deleteCommandSentence(formData.get("id"));

        window.location.replace("/CommandSentence/CommandSentenceDetailedIndex");
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