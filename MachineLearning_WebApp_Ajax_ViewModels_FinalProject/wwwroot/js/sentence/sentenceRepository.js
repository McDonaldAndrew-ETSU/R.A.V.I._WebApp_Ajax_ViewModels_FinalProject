"using strict";

const baseAddress = "https://localhost:7042/api/commandsentenceapi";



export async function create(formData) {
    const address = `${baseAddress}/createsentence`;

    const response = await fetch(address, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        throw new Error("There was an HTTP error POSTing the Sentence data.");
    }

    return await response.json();
}


export async function readAllSentences() {
    const address = `${baseAddress}/allsentences`;

    const response = await fetch(address); //default fetch: GET

    if (!response.ok) {
        throw new Error("There was an HTTP error GETting the readAll() Sentence data.");
    }

    return await response.json();
}


export async function readSentence(id) {
    const address = `${baseAddress}/onesentence/${id}`;

    const response = await fetch(address); //default fetch: GET

    if (!response.ok) {
        throw new Error("There was an HTTP error GETting the Sentence data.");
    }

    return await response.json();
}


export async function update(formData) {
    const address = `${baseAddress}/updatesentence`;

    const response = await fetch(address, {
        method: "PUT",
        body: formData
    });

    if (!response.ok) {
        throw new Error("There was an HTTP error PUTting the Sentence data.")
    }

    return await response.text();
}


export async function deleteSentence(id) {
    const address = `${baseAddress}/deletesentence/${id}`;

    const response = await fetch(address, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("There was an error DELETEing the Sentence data");
    }

    return await response.text();
}