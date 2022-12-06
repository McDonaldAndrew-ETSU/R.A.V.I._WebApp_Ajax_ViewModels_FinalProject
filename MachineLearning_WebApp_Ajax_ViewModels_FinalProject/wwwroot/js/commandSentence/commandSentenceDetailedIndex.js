"using strict";

import { readAllCommandSentences } from "./commandSentenceRepository.js";

let commandSentences = await readAllCommandSentences();
const commandSentenceTableBody = document.querySelector("#commandSentenceTableBody");


commandSentences.forEach((cs) => {
    commandSentenceTableBody.appendChild(createTableRowForCommandSentence(cs)); //the function createTableRowForCommandSentence() must be created
});

function createTableRowForCommandSentence(cs) {
    const tr = document.createElement("tr");

    tr.appendChild(createTableData(cs.id)); //the function createTableData() must be created
    tr.appendChild(createTableData(cs.commandAction));
    tr.appendChild(createTableData(cs.sentenceSpelling));

    tr.appendChild(createTableDataLinks(cs.id)); //the function createTableDataLinks() must be created

    return tr;
}

function createTableData(data) {
    const td = document.createElement("td");

    td.appendChild(document.createTextNode(data));

    return td;
}

function createTableDataLinks(id) {
    const td = document.createElement("td");

    td.appendChild(createLink(`/CommandSentence/CommandSentenceEdit/${id}`, "Edit")); //the function createLink() must be created
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(createLink(`/CommandSentence/CommandSentenceDetails/${id}`, "Details"));
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(createLink(`/CommandSentence/CommandSentenceDelete/${id}`, "Delete"));

    return td;
}

function createLink(url, text) {
    const a = document.createElement("a");

    a.setAttribute("href", url);

    a.appendChild(document.createTextNode(text));

    return a;
}