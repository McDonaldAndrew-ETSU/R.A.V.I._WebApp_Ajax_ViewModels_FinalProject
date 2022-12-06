"using strict";

const mainPicture = document.querySelector("#mainPicture");
const pictureRow = document.querySelector("#pictureRow");
const roadRunner = document.querySelector("#roadRunner");
const catalina = document.querySelector("#catalina");
const camaro = document.querySelector("#camaro");
const rX7 = document.querySelector("#rX7");

let describe = document.querySelector("#describe");


roadRunner.addEventListener("click", () => {
    switchPicture(roadRunner);
    describe.innerText = "This is a 1970 Plymouth Road Runner";
});
catalina.addEventListener("click", () => {
    switchPicture(catalina);
    describe.innerText = "This is a 1966 Pontiac Catalina";
});
camaro.addEventListener("click", () => {
    switchPicture(camaro);
    describe.innerText = "This is a 1981 Chevrolet Camaro";
});
rX7.addEventListener("click", () => {
    switchPicture(rX7);
    describe.innerText = "This is a 2000 Mazda Rx7";
});


function switchPicture(childNode) {
    try {
        childNode.classList.remove("col-md-4");
        pictureRow.removeChild(childNode);

        let bigImage = mainPicture.firstElementChild;
        bigImage.classList.add("col-md-4");
        mainPicture.removeChild(bigImage);
        mainPicture.appendChild(childNode);

        pictureRow.appendChild(bigImage);
    } catch (e) {
        console.log(e);
    }
}