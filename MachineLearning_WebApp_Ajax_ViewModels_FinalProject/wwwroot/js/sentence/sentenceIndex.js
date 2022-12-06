"using strict";

import { readAllSentences } from "./sentenceRepository.js";


let sentences = await readAllSentences();
const sentenceTableBody = document.querySelector("#sentenceTableBody");

sentences.forEach((s) => {
    sentenceTableBody.appendChild(createTableRowForSentence(s)); //the function createTableRowForSentence() must be created
});



function createTableRowForSentence(s) {
    const tr = document.createElement("tr");

    tr.appendChild(createTableData(s.spelling)); //the function createTableData() must be created

    tr.appendChild(createTableDataLinks(s.spelling)); //the function createTableDataLinks() must be created

    return tr;
}


function createTableData(data) {
    const td = document.createElement("td");

    td.appendChild(document.createTextNode(data));

    return td;
}


function createTableDataLinks(id) {
    const td = document.createElement("td");

    td.appendChild(createLink(`/Sentence/SentenceEdit/${id}`, "Edit")); //the function createLink() must be created
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(createLink(`/Sentence/SentenceDetails/${id}`, "Details"));
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(createLink(`/Sentence/SentenceDelete/${id}`, "Delete"));

    return td;
}


function createLink(url, text) {
    const a = document.createElement("a");

    a.setAttribute("href", url);

    a.appendChild(document.createTextNode(text));

    return a;
}