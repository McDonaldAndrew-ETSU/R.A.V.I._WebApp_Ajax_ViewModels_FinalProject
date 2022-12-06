"using strict";

import { create } from "./commandRepository.js";

const formCommandCreate = document.querySelector("#formCommandCreate");

formCommandCreate.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formCommandCreate);

    const result = await create(formData);
    console.log(result);

    window.location.replace("/Command/CommandIndex");
});