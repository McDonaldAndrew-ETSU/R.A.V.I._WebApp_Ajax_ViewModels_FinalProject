"using strict";

import { read, update } from "./commandSentenceRepository.js";
import { readAllCommands } from "../command/commandRepository.js";
import { readAllSentences } from "../sentence/sentenceRepository.js";


const commandSentenceHeading = document.querySelector("#commandSentenceHeading");
removeChildren(commandSentenceHeading);
commandSentenceHeading.appendChild(document.createTextNode("LOADING..."));

const urlSections = window.location.href.split("/");
const commandSentenceId = urlSections[5];



let commands = await readAllCommands();
const commandSelectBox = document.querySelector("#commandSelectBox");
commands.forEach((c) => commandSelectBox.appendChild(createSelectBoxOptions(c.action)));

let sentences = await readAllSentences();
const sentenceSelectBox = document.querySelector("#sentenceSelectBox");
sentences.forEach((s) => sentenceSelectBox.appendChild(createSelectBoxOptions(s.spelling)));

function createSelectBoxOptions(value) {
    const option = document.createElement("option");

    option.value = `${value}`;
    option.text = `${value}`;

    return option
}




await populateSentenceData();

async function populateSentenceData() {
    try {
        const commandSentence = await read(commandSentenceId);

        setValue("#Id", commandSentence.id); //setValue(elementId, text) is defined below
        setValue("#commandSelectBox", commandSentence.commandAction); 
        setValue("#sentenceSelectBox", commandSentence.sentenceSpelling);

        removeChildren(commandSentenceHeading); //removeChildren(element) is defined below
        commandSentenceHeading.appendChild(document.createTextNode(`Edit CommandSentence: "${commandSentence.id}"`));
    }
    catch (e) {
        console.log(e);
        window.location.replace("/CommandSentence/CommandSentenceDetailedIndex");
    }
}


const formCommandSentenceEdit = document.querySelector("#formCommandSentenceEdit");

formCommandSentenceEdit.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formCommandSentenceEdit);
    try {
        await update(formData);

        window.location.replace("/CommandSentence/CommandSentenceDetailedIndex");
    }
    catch (e) {
        console.log(e);

        $('#messageArea').html("There was an error editing a CommandSentence.");
        $('#alertArea').show();
        setInterval(() => {
            $('#alertArea').fadeOut(1500);
        }, 1500);
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