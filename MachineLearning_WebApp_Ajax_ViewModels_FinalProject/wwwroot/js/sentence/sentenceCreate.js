/* CITED SOURCES
 * checkCookieStringText() and getCookie(cname) are cited from: https://www.w3schools.com/js/js_cookies.asp
 */
"using strict";

import { create } from "./sentenceRepository.js";

const formSentenceCreate = document.querySelector("#formSentenceCreate");
const spellingInput = document.querySelector("#spellingInput");

console.log(document.cookie);
window.addEventListener("load", checkCookieStringText());

formSentenceCreate.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formSentenceCreate);

    const result = await create(formData);
    console.log(result);

    window.location.replace("/Sentence/SentenceIndex");
});


function checkCookieStringText() {
    if (!getCookie("stringText") == "") {
        spellingInput.value = getCookie("stringText");
        document.cookie = "stringText=; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;" //deletes cookie
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