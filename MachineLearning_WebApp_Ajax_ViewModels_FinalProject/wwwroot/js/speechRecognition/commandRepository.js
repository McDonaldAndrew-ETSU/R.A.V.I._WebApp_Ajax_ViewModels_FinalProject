"using strict";

import { hiddenName, nameOfProgram, utterance, recognition, button } from "./speechIndex.js";
import { getShortName } from "./speechRecognitionRepository.js";

export function executeCommands(commands) {
    commands.forEach((c) => {
        switch (c) {
            case "Greeting":
                greeting();
                break;
            case "GreetingModal":
                greetingModal();
                break;
            case "OpenReactDocs":
                openReactDocs();
                break;
            case "LightBoxModal":
                lightBoxModal();
                break;
            case "Goodbye":
                goodbye();
                break;
            default:
                console.log("something went wrong");
                break;
        }
    });
}

function greeting() {
    utterance.text = "Hi Andrew, how can I help you sir?";
    switch (`${hiddenName.getAttribute("data-username")}`) {
        case "admin@test.com":
            utterance.text = `Hello sir, how can I help?`;
            break;
        default:
            utterance.text = `Hello ${hiddenName.getAttribute("data-name")}, how can I help you?`;
            break;
    }
    console.log(utterance);
    speechSynthesis.speak(utterance);
}

function greetingModal() {
    const greetingModalDOM = document.querySelector("#greetingModal");
    const greetingModal = new bootstrap.Modal(greetingModalDOM);
    nameOfProgram.innerText = `${getShortName()}`;
    greetingModal.show();
    utterance.text = `Greetings dear ${hiddenName.getAttribute("data-name")}, I hope this modal finds you well. Sincerely, ${getShortName()}.`;
    speechSynthesis.speak(utterance);
}

function openReactDocs() {
    utterance.text = "Okay. Opening a new tab for React documentation.";
    speechSynthesis.speak(utterance);
    window.open("https://reactjs.org/", "_blank");
}

function lightBoxModal() {
    const lightBoxModalDOM = document.querySelector("#lightBoxModal");
    const lightBoxModal = new bootstrap.Modal(lightBoxModalDOM);
    lightBoxModal.show();
    utterance.text = "Opening lightbox.";
    speechSynthesis.speak(utterance);
}

function goodbye() {
    switch (`${hiddenName.getAttribute("data-username")}`) {
        case "admin@test.com":
            utterance.text = `Goodbye sir. I hope to see you again soon!`;
            break;
        default:
            utterance.text = `Goodbye ${hiddenName.getAttribute("data-name")}, I hope to see you again soon!`;
            break;
    }
    console.log(utterance);
    speechSynthesis.speak(utterance);
    button.click();
}