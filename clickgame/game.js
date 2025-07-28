const widget_container = document.getElementById("widget-container");
const stores = document.getElementsByClassName("store");
const score_element = document.getElementById("score");
let score = 5;
let super_gompei_count = 0;
let lawnCount = 0;
let gompeiCount= 0;

function changeScore(amount) {
    score += amount;
    score_element.innerHTML = "Score: " + score;

    // Update the stores to block buying expensive boxes
    for (let store of stores) {
        let cost = parseInt(store.getAttribute("cost"));

        if (score < cost) {
            store.setAttribute("broke", "");
        } else {
            store.removeAttribute("broke");
        }
    }
}
function buy(store) {
    const cost = parseInt(store.getAttribute("cost"));

    if (score < cost) {
        return;
    }
    const gompei = document.querySelector("#widget-container #gompei")?.parentElement;
    if (store.getAttribute("name") === "Gompei" && gompei) {
        gompei.setAttribute("reap", (parseInt(gompei.getAttribute("reap")) + 10));
        gompeiCount += 1;
        return;

    }
    // If Lawnmower already exists
    const lawnmower = document.querySelector("#widget-container #lawnmower")?.parentElement;
    if (store.getAttribute("name") === "Lawnmower" && lawnmower) {
        store.setAttribute("broke", "");
        return;
    }

    changeScore(-cost);

    // If Super-Gompei already exists
    const superGompei = document.querySelector("#widget-container #super-gompei")?.parentElement;
    if (store.getAttribute("name") === "Super-Gompei" && superGompei) {
        superGompei.setAttribute("reap", (parseInt(superGompei.getAttribute("reap")) + 100));
        super_gompei_count += 1;
        document.body.style = "--gompei-count: " + super_gompei_count + ";"
        return;
    }
    //update lawn count
    const lawn = document.querySelector("#widget-container #lawn")?.parentElement;
    if (store.getAttribute("name") === "Lawn" && lawn) {
        lawn.setAttribute("reap", (parseInt(lawn.getAttribute("reap")) + 2));
        lawnCount += 1;
        return;

    }




    const widget = store.firstElementChild.cloneNode(true);
    widget.onclick = () => {
        harvest(widget);
    }
    widget_container.appendChild(widget);

    if (widget.getAttribute("auto") == 'true') {
        widget.setAttribute("harvesting", "");
        setup_end_harvest(widget);
    }
}

function setup_end_harvest(widget) {
    setTimeout(() => {
        // Remove the harvesting flag
        widget.removeAttribute("harvesting");
        // If automatic, start again
        if (widget.getAttribute("auto") == 'true') {
            harvest(widget);
        }
    }, parseFloat(widget.getAttribute("cooldown")) * 1000);
}

function harvest(widget) {
    // Only run if currently not harvesting
    if (widget.hasAttribute("harvesting")) return;
    // Set harvesting flag
    widget.setAttribute("harvesting", "");


    // If manual, collect points now
    changeScore(parseInt(widget.getAttribute("reap")));
    setup_end_harvest(widget);
    //mow all lawns
    if (widget.getAttribute("name") ===("Lawnmower")){
        console.log("mower");
        const lawns = document.querySelectorAll("#widget-container #lawn");
        for (let lawn of lawns) {
            if (lawn.hasAttribute("harvesting")) continue;
            harvest(lawn.parentElement)
        }
        return;
    }
    showPoint(widget);

    
}


function showPoint(widget) {
    let number = document.createElement("span");
    number.className = "point";
    number.innerHTML = "+" + widget.getAttribute("reap");
    number.onanimationend = () => {
        widget.removeChild(number);
    }
    widget.appendChild(number);
}

//changeScore(0);