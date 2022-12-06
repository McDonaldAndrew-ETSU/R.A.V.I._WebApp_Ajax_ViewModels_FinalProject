"using strict";

import { readAllCommands } from "./commandRepository.js";

let commands = await readAllCommands();
const commandTableBody = document.querySelector("#commandTableBody");


commands.forEach((c) => {
    commandTableBody.appendChild(createTableRowForCommand(c)); //the function createTableRowForCommand() must be created
});

function createTableRowForCommand(c) {
    const tr = document.createElement("tr");

    tr.appendChild(createTableData(c.action)); //the function createTableData() must be created

    tr.appendChild(createTableDataLinks(c.action)); //the function createTableDataLinks() must be created

    return tr;
}

function createTableData(data) {
    const td = document.createElement("td");

    td.appendChild(document.createTextNode(data));

    return td;
}

function createTableDataLinks(id) {
    const td = document.createElement("td");

    td.appendChild(createLink(`/Command/CommandEdit/${id}`, "Edit")); //the function createLink() must be created
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(createLink(`/Command/CommandDetails/${id}`, "Details"));
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(createLink(`/Command/CommandDelete/${id}`, "Delete"));

    return td;
}

function createLink(url, text) {
    const a = document.createElement("a");

    a.setAttribute("href", url);

    a.appendChild(document.createTextNode(text));

    return a;
}