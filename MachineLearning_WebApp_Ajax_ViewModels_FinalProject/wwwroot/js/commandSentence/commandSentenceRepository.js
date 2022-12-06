"using strict";

const baseAddress = "https://localhost:7042/api/commandsentenceapi";



export async function create(formData) {
    const address = `${baseAddress}/createcommandsentence`;

    const response = await fetch(address, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        throw new Error("There was an HTTP error POSTing the CommandSentence data.");
    }

    return await response.json();
}


export async function readAllCommandSentences() {
    const address = `${baseAddress}/allcommandsentences`;

    const response = await fetch(address); //default fetch: GET

    if (!response.ok) {
        throw new Error("There was an HTTP error GETting the readAll() CommandSentence data.");
    }

    return await response.json();
}


export async function read(id) {
    const address = `${baseAddress}/onecommandsentence/${id}`;

    const response = await fetch(address); //default fetch: GET

    if (!response.ok) {
        throw new Error("There was an HTTP error GETting the CommandSentence data.");
    }

    return await response.json();
}


export async function update(formData) {
    const address = `${baseAddress}/updatecommandsentence`;

    const response = await fetch(address, {
        method: "PUT",
        body: formData
    });

    if (!response.ok) {
        throw new Error("There was an HTTP error PUTting the CommandSentence data.")
    }

    return await response.text();
}


export async function deleteCommandSentence(id) {
    const address = `${baseAddress}/deletecommandsentence/${id}`;

    const response = await fetch(address, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("There was an error DELETEing the CommandSentence data");
    }

    return await response.text();
}