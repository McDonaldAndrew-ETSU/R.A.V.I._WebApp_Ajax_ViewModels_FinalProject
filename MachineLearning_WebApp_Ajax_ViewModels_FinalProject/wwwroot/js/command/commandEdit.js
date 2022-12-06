"using strict";

import { readCommand, update } from "./commandRepository.js";

const commandHeading = document.querySelector("#commandHeading");
removeChildren(commandHeading);//removeChildren(element) is defined below
commandHeading.appendChild(document.createTextNode("LOADING..."));

const urlSections = window.location.href.split("/");
const commandId = urlSections[5];


await populateCommandData();

async function populateCommandData() {
    try {
        const command = await readCommand(commandId);

        setValue("#Action", command.action); //setValue(elementId, text) is defined below
        setValue("#Information", command.information); 
        setValue("#CommandType", command.commandType);

        removeChildren(commandHeading);
        commandHeading.appendChild(document.createTextNode(`Edit: ${command.action}`));
    }
    catch (e) {
        console.log(e);
        window.location.replace("/Command/CommandIndex");
    }
}


const formCommandEdit = document.querySelector("#formCommandEdit");

formCommandEdit.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formCommandEdit);

    try {
        await update(formData);

        window.location.replace("/Command/CommandIndex");
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