/* CITED SOURCES:
 * webkitSpeechRecognition(), SpeechSynthesisUtterance(), getAllVoices() 
 * are all cited from: https://betterprogramming.pub/perform-speech-recognition-in-your-javascript-applications-91367b0d0
 * and: https://betterprogramming.pub/perform-speech-synthesis-in-your-javascript-applications-ac3efa1eb6fa
 */
"using strict";

import { checkCookieUtterance, getShortName, sentenceToCommandCheck } from "./speechRecognitionRepository.js";

const voiceSelectBox = document.querySelector("#voiceSelectBox");
const content = document.querySelector("#content");
const button = document.querySelector("#button");
const hiddenName = document.querySelector("#hiddenName");
const nameOfProgram = document.querySelector("#nameOfProgram");

const recognition = new webkitSpeechRecognition(); // create a SpeechRecognition object
recognition.continuous = true; // configure setting that continuous results are returned for each recognition
recognition.interimResults = true; // configure setting that interim results should be returned

let utterance = new SpeechSynthesisUtterance(); // create a SpeechSynthesis object


function getAllVoices() {
    return new Promise(function (resolve, reject) {
        let id;

        id = setInterval(() => {
            if (speechSynthesis.getVoices().length !== 0) {
                resolve(speechSynthesis.getVoices());
                clearInterval(id);
            }
        }, 10);
    });
}
getAllVoices().then((voices) => {
    voices.forEach((v) => voiceSelectBox.appendChild(createSelectBoxOptions(v.name))); // line 47

    window.addEventListener("load", checkCookieUtterance(voices)); // speechRecognitionRepository.js

    voiceSelectBox.addEventListener("change", () => {
        try {
            utterance.voice = voices[(voiceSelectBox.selectedIndex) - 1];
            utterance.pitch = 1;
            utterance.rate = 1.3;
            switch (`${hiddenName.getAttribute("data-username")}`) {
                case "admin@test.com":
                    utterance.text = `Hello sir, my name is ${getShortName()}`; // speechRecognitionRepository.js
                    break;
                default:
                    utterance.text = `Hello ${hiddenName.getAttribute("data-name")}, my name is ${getShortName()}`; // speechRecognitionRepository.js
                    break;
            }
            console.log(utterance);
            speechSynthesis.speak(utterance);
            document.cookie = `utteranceVoice=${utterance.voice.name}`;
        } catch (e) {
            console.log(e);
        }
    });
});

function createSelectBoxOptions(value) {
    const option = document.createElement("option");

    option.value = `${value}`;
    option.text = `${value}`;

    return option
}


button.addEventListener("click", () => {
    if (button.className == "btn btn-light") {
        recognition.start(); // starts speech recognition

        recognition.onresult = async function (event) {  // event handler when a word or phrase has been positively recognized

            let output = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                output += event.results[i][0].transcript;

                if (event.results[i].isFinal) {
                    if (output.charAt(0) === " ") {
                        output = output.substring([1], output.length);
                    }
                    console.log(`Final Recognition Output:'${output}'`);
                    await sentenceToCommandCheck(output); // speechRecognitionRepository.js
                }
            }
            content.innerText = output;
        };

        button.className = "btn btn-dark";
        button.innerText = "Listening......";
    } else {
        recognition.stop(); // stops speech recognition

        button.className = "btn btn-light";
        button.innerText = "Click to Listen";
    }
});


export { hiddenName, nameOfProgram, utterance, button, recognition };