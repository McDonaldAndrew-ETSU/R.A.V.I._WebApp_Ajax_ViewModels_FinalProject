"using strict";

import { readCommand } from "./commandRepository.js";

const commandHeading = document.querySelector("#commandHeading");
removeChildren(commandHeading); //removeChildren(element) is defined below
commandHeading.appendChild(document.createTextNode("LOADING..."));


const urlSections = window.location.href.split("/"); //console.log(urlSections); helps find the index for the Id of the object
const commandId = urlSections[5];


await populateCommandData();

async function populateCommandData() {
    try {
        const command = await readCommand(commandId);

        setText("#commandAction", command.action); //setText(elementId, text) is defined below
        setText("#commandInformation", command.information);
        setText("#commandType", command.commandType);

        removeChildren(commandHeading);
        commandHeading.appendChild(document.createTextNode(`Details for: ${command.action}`));
    }
    catch (e) {
        console.log(e);
        window.location.replace("/Command/CommandIndex");
    }
}

function setText(elementId, text) {
    const element = document.querySelector(elementId);

    element.appendChild(document.createTextNode(text));
}


const div = document.querySelector("#div");
div.appendChild(createEditLink(commandId)); //createDivEditLink(id) defined below

function createEditLink(id) {
    const td = document.createElement("td");

    td.appendChild(document.createTextNode(" | "));
    td.appendChild(createLink(`/Command/CommandEdit/${id}`, "Edit")); //creatLink(url, text) defined below

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