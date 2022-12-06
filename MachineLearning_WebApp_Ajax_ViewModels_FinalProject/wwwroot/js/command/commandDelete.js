"using strict";
//"Preserve logs" in Chrome dev tools


import { readCommand, deleteCommand } from "./commandRepository.js";

const commandHeading = document.querySelector("#commandHeading");
removeChildren(commandHeading); //removeChildren(element) is defined below
commandHeading.appendChild(document.createTextNode("LOADING..."));


const urlSections = window.location.href.split("/");
const commandId = urlSections[5];



await populateCommandData(); //populateCommandData() is defined below

async function populateCommandData() {
    try {
        const command = await readCommand(commandId);

        setText("#commandAction", command.action); //setText(elementId, text) is defined below

        setValue("#id", command.action); //setValue(elementId, text) is defined below


        removeChildren(commandHeading);
        commandHeading.appendChild(document.createTextNode("Command Delete"));
    }
    catch (e) {
        console.log(e);

        window.location.replace("/Command/CommandIndex")
    }
}



const formCommandDelete = document.querySelector("#formCommandDelete");

formCommandDelete.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formCommandDelete);

    try {
        await deleteCommand(formData.get("id"));

        window.location.replace("/Command/CommandIndex");
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