"using strict";

const baseAddress = "https://localhost:7042/api/commandsentenceapi";



export async function create(formData) {
    const address = `${baseAddress}/createcommand`;

    const response = await fetch(address, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        throw new Error("There was an HTTP error POSTing the Command data.");
    }

    return await response.json();
}


export async function readAllCommands() {
    const address = `${baseAddress}/allcommands`;

    const response = await fetch(address); //default fetch: GET

    if (!response.ok) {
        throw new Error("There was an HTTP error GETting the readAll() Command data.");
    }

    return await response.json();
}


export async function readCommand(id) {
    const address = `${baseAddress}/onecommand/${id}`;

    const response = await fetch(address); //default fetch: GET

    if (!response.ok) {
        throw new Error("There was an HTTP error GETting the Command data.");
    }

    return await response.json();
}


export async function update(formData) {
    const address = `${baseAddress}/updatecommand`;

    const response = await fetch(address, {
        method: "PUT",
        body: formData
    });

    if (!response.ok) {
        throw new Error("There was an HTTP error PUTting the Command data.")
    }

    return await response.text();
}


export async function deleteCommand(id) {
    const address = `${baseAddress}/deletecommand/${id}`;

    const response = await fetch(address, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("There was an error DELETEing the Command data");
    }

    return await response.text();
}