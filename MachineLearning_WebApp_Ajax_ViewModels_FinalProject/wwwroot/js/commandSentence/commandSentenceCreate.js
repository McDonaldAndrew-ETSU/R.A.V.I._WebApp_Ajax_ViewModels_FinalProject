/* CITED SOURCES
 * checkCookieSentenceSpelling() and getCookie(cname) are cited from: https://www.w3schools.com/js/js_cookies.asp
 */
"using strict";

import { create } from "./commandSentenceRepository.js";
import { readAllCommands } from "../command/commandRepository.js";
import { readAllSentences } from "../sentence/sentenceRepository.js";

const formCommandSentenceCreate = document.querySelector("#formCommandSentenceCreate");
const commandSelectBox = document.querySelector("#commandSelectBox");
const sentenceSelectBox = document.querySelector("#sentenceSelectBox");

let commands = await readAllCommands();
commands.forEach((c) => commandSelectBox.appendChild(createSelectBoxOptions(c.action)));

let sentences = await readAllSentences();
let sentenceSpellings = [];
sentences.forEach((s) => {
    sentenceSelectBox.appendChild(createSelectBoxOptions(s.spelling));
    sentenceSpellings.push(s.spelling);
});


console.log(document.cookie);
window.addEventListener("load", checkCookieSentenceSpelling());


formCommandSentenceCreate.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formCommandSentenceCreate);

    try {
        const result = await create(formData);
        console.log(result);

        window.location.replace("/CommandSentence/CommandSentenceDetailedIndex");
    } catch (e) {
        console.log(e);

        $('#messageArea').html("There was an error creating a CommandSentence.");
        $('#alertArea').show();
        setInterval(() => {
            $('#alertArea').fadeOut(1500);
        }, 1500);
    }
});

function createSelectBoxOptions(value) {
    const option = document.createElement("option");

    option.value = `${value}`;
    option.text = `${value}`;

    return option
}

function checkCookieSentenceSpelling() {
    if (!getCookie("sentenceSpelling") == "") {
        sentenceSelectBox.value = sentenceSpellings.find((sp) => sp === getCookie("sentenceSpelling"));
        document.cookie = "sentenceSpelling=; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;" //deletes cookie
        console.log(document.cookie);
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}