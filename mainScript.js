const base_url = "https://cdn.jsdelivr.net/gh/ismartcoding/currency-api@main/latest/data.json"
let selection = document.querySelectorAll(".content select");
let button = document.querySelector(".form button")
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let res = document.querySelector(".result p");

for (let select of selection) {
    for (curcode in contries) {
        let newOption = document.createElement("option")
        newOption.innerText = curcode;
        newOption.value = curcode;
        if (select.name === "from" && curcode === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && curcode === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    };

    select.addEventListener("change", (evt) => {
        flagChange(evt.target);
    });
}

function flagChange(element) {
    let cntcode = element.value;
    let flag = contries[cntcode];
    let newSrc = `https://flagsapi.com/${flag}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

let a, b, amount;

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let input = document.querySelector(".input input");
    amount = input.value;
    if (amount === "" || amount < 1) {
        amount = 1;
    }

    let URL = await fetch(base_url);
    let response = await URL.json();
    for (let data in response.quotes) {

        if (fromcurr.value === data) {
            a = response.quotes[data];
        }
        if (tocurr.value === data) {
            b = response.quotes[data];
        }
    }
    result(a, b, amount);
})


function result(a, b, amount) {
    if (fromcurr.value ==="USD") {
        let total = eval(b * amount)
        res.innerText = `${amount}${fromcurr.value} = ${total}${tocurr.value}`
    }
    else{
        let total = eval((b/a)*amount);
        res.innerText = `${amount}${fromcurr.value} = ${total}${tocurr.value}`
    }

}



