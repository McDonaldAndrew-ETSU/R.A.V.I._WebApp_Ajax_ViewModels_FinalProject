/* CITED SOURCES
 * checkCookieUtterance() and getCookie(cname) are all cited from: https://www.w3schools.com/js/js_cookies.asp
 */
"using strict";

import { readAllCommandSentences } from "../commandSentence/commandSentenceRepository.js";
import { hiddenName, utterance, recognition, button } from "./speechIndex.js";
import { readSentence } from "../sentence/sentenceRepository.js";
import { executeCommands } from "./commandRepository.js";

let sentence;
let allMatchingCommandSentences;
let allMatchingCommands;
export async function sentenceToCommandCheck(stringText) {
    try {
        sentence = await readSentence(stringText);
        console.log(`Match! Sentence spelling: '${sentence.spelling}', String Text: '${stringText}'`);
        document.cookie = `sentenceSpelling=${sentence.spelling}`;

        allMatchingCommandSentences = await getAnyCommandSentencesCheck(); // line 61
        if (!allMatchingCommandSentences.length == 0) {
            console.log(`Match! ${allMatchingCommandSentences.length} CommandSentence(s) matching with sentence:\n'${sentence.spelling}'`);

            allMatchingCommands = getAnyCommandsCheck(); // line 74
            console.log(`Command(s) of the matching CommandSentences:\n'${allMatchingCommands}'`);

            executeCommands(allMatchingCommands); // commandRepository.js
        }
        else {
            console.log(`The Sentence: '${sentence.spelling}' is not linked to any Commands yet. Would you like to create a new CommandSentence?`);
            utterance.text = `The Sentence: '${sentence.spelling}' is not linked to any Commands yet. Would you like to create a new CommandSentence?`;
            speechSynthesis.speak(utterance);

            recognition.onresult = async function (event) {  // event handler when a word or phrase has been positively recognized
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    let transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        transcript = transcript.substring([1], transcript.length);

                        console.log(`Final Recognition Output:${transcript}`);
                        yesNoOne(transcript); // line 85
                    }
                    content.innerText = transcript;
                }
            }
        }
    } catch (e) {
        console.log(`${e}\n${stringText} was not recognized in the database. Would you like to create a new Sentence?`);
        utterance.text = `"${stringText}" was not recognized in the database. Would you like to create a new sentence?`;
        speechSynthesis.speak(utterance);
        document.cookie = `stringText=${stringText}`;

        recognition.onresult = async function (event) {  // event handler when a word or phrase has been positively recognized
            for (let i = event.resultIndex; i < event.results.length; i++) {
                let transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    transcript = transcript.substring([1], transcript.length);

                    console.log(`Final Recognition Output:${transcript} `);
                    yesNoTwo(transcript); // line 111
                }
                content.innerText = transcript;
            }
        }
    }
}


async function getAnyCommandSentencesCheck() { 
    let allCommandSentences = await readAllCommandSentences();

    let allCommandSentencesWithMatchingSentence = [];
    allCommandSentences.forEach((cs) => {
        if (cs.sentenceSpelling === sentence.spelling) {
            allCommandSentencesWithMatchingSentence.push(cs);
        }
    });

    return allCommandSentencesWithMatchingSentence;
}

function getAnyCommandsCheck() { 
    let allCommands = [];
    allMatchingCommandSentences.forEach((mcs) => {
        allCommands.push(mcs.commandAction);
    });

    return allCommands;
}


function yesNoOne(answer) {
    switch (answer.toLowerCase()) {
        case "yes":
            console.log("Navigating to CommandSentence Create page.");

            utterance.text = "Okay. Navigating you to the CommandSentence Create page. See you soon sir.";
            speechSynthesis.speak(utterance);

            setInterval(() => {
                window.location.replace("https://localhost:7181/CommandSentence/CommandSentenceCreate");
            }, 1500);
            break;
        case "no":
            console.log("Restarting listening process...");

            button.click();
            utterance.text = "Okay. You can click the button so I can listen to another sentence.";
            speechSynthesis.speak(utterance);
            break;
        default:
            console.log("That wasn't recognized as a yes or no. Please try again");
            utterance.text = "That wasn't recognized as a yes or no. Please try again";
            speechSynthesis.speak(utterance);
    }
}

function yesNoTwo(answer) {
    switch (answer.toLowerCase()) {
        case "yes":
            console.log("Navigating to Sentence Create page.");

            utterance.text = "Okay. Navigating you to the Sentence Create page. See you soon sir.";
            speechSynthesis.speak(utterance);

            setInterval(() => {
                window.location.replace("https://localhost:7181/Sentence/SentenceCreate");
            }, 1500);
            break;
        case "no":
            console.log("Restarting listening process...");

            button.click();
            utterance.text = "Okay. You can click the button so I can listen to another sentence.";
            speechSynthesis.speak(utterance);
            break;
        default:
            console.log("That wasn't recognized as a yes or no. Please try again");
            utterance.text = "That wasn't recognized as a yes or no. Please try again";
            speechSynthesis.speak(utterance);
    }
}


export function checkCookieUtterance(voices) {
    try {
        utterance.voice = voices.find((v) => v.name === getCookie("utteranceVoice"));
        console.log(getCookie("utteranceVoice"));
        utterance.pitch = 1;
        utterance.rate = 1.3;
        voiceSelectBox.value = utterance.voice.name;
        switch (`${hiddenName.getAttribute("data-username")}`) {
            case "admin@test.com":
                utterance.text = `Welcome back sir, this is ${getShortName()} speaking!`;
                break;
            default:
                utterance.text = `Welcome back ${hiddenName.getAttribute("data-name")}, this is ${getShortName()} speaking!`;
                break;
        }
        console.log(utterance);
        speechSynthesis.speak(utterance);
    } catch (e) {
        console.log(e);
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

export function getShortName() {
    let name = utterance.voice.name.split(" ");

    if (name[0][0] == "G") {
        utterance.rate = 1.1;
        return utterance.voice.name;
    }

    return name[1];
}