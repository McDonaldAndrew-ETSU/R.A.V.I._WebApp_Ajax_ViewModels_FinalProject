"using strict";

import { read } from "./commandSentenceRepository.js";

const commandSentenceHeading = document.querySelector("#commandSentenceHeading");
removeChildren(commandSentenceHeading); //removeChildren(element) is defined below
commandSentenceHeading.appendChild(document.createTextNode("LOADING..."));

const urlSections = window.location.href.split("/");
//console.log(urlSections); helps find the index for the Id of the object
const commandSentenceId = urlSections[5];


await populateCommandSentenceData();

async function populateCommandSentenceData() {
    try {
        const commandSentence = await read(commandSentenceId);

        setText("#csId", commandSentence.id);
        setText("#csCommandAction", commandSentence.commandAction);
        setText("#csCommandInfo", commandSentence.command.information);
        setText("#csCommandType", commandSentence.command.commandType);
        setText("#csSentenceSpelling", commandSentence.sentenceSpelling);
        setText("#csSentenceMeaning", commandSentence.sentence.meaning);

        removeChildren(commandSentenceHeading);
        commandSentenceHeading.appendChild(document.createTextNode(`Details for CommandSentence: ${commandSentence.id}`));
    }
    catch (e) {
        console.log(e);
        window.location.replace("/CommandSentence/CommandSentenceDetailedIndex");
    }
}

function setText(elementId, text) {
    const element = document.querySelector(elementId);

    element.appendChild(document.createTextNode(text));
}


const div = document.querySelector("#div");
div.appendChild(createEditLink(commandSentenceId)); //createDivEditLink(id) defined below

function createEditLink(id) {
    const td = document.createElement("td");

    td.appendChild(document.createTextNode(" | "));
    td.appendChild(createLink(`/CommandSentence/CommandSentenceEdit/${id}`, "Edit")); //creatLink(url, text) defined below

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