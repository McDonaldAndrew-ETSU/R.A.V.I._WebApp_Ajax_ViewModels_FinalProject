"using strict";

import { readAllCommandSentences } from "./commandSentenceRepository.js";

let commandSentences = await readAllCommandSentences();
const commandSentenceTableBody = document.querySelector("#commandSentenceTableBody");


commandSentences.forEach((cs) => {
    commandSentenceTableBody.appendChild(createTableRowForCommandSentence(cs)); //the function createTableRowForCommandSentence() must be created
});

function createTableRowForCommandSentence(cs) {
    const tr = document.createElement("tr");

    let action = cs.commandAction;
    let spelling = cs.sentenceSpelling;

    let subStringAction = action.substr(0, 4);
    let subStringSpelling = spelling.substr(0, 3);
    
    let codeName = `${subStringAction}${subStringSpelling}`;


    tr.appendChild(createTableData(cs.id)); //the function createTableData() must be created
    tr.appendChild(createTableData(codeName)); 

    return tr;
}

function createTableData(data) {
    const td = document.createElement("td");

    td.appendChild(document.createTextNode(data));

    return td;
}