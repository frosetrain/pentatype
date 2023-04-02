let twGray = {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
};

let gray = {
    dark: {
        bg: twGray[900],
        fg: twGray[100],
    },
    light: {
        bg: twGray[100],
        fg: twGray[900],
    },
};

let currentLine;
let currentChar;
let typed;
let quote;
let otherLines;
let lines;
let quoteLength;
let lineId;
let otherLinesBox;
let theme;
let timeStart;

function getRandomQuote() {
    $.getJSON("src/quotes.json", function (json) {
        console.log(json);
    });
    // return json[Math.floor(Math.random() * 10)];
}
console.log(getRandomQuote());

function showTyping() {
    let firstError = currentChar;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] != currentLine[i]) {
            firstError = i;
            break;
        }
    }
    currentLineBox.html(
        "<span class=text-blue-500>> </span>" +
            "<span class='text-gray-900 dark:text-gray-100'>" +
            typed.substring(0, firstError) + // white
            "</span><span class='text-red-500'>" +
            typed.substring(firstError, currentChar) + // red
            "</span>" +
            currentLine.substring(currentChar, currentLine.length) // gray
    );
}

function success(timeTaken) {
    removeElements();
    let wpm = ((quote.length / timeTaken) * 60000) / 5;
    fill(gray[theme]["fg"]);
    text(`Congratulations, ${round(wpm)} wpm`, 100, 100);
}

function setup() {
    lineId = 0;
    currentChar = 0;
    typed = "";
    quote = "hmm\nyes\nshake\n";
    otherLines = quote.substring(quote.indexOf("\n") + 1);
    if (quote[quote.length - 1] == "\n") {
        quote = quote.substring(0, quote.length - 1);
    }
    lines = quote.split("\n");
    currentLine = lines[0];
    quoteLength = lines.length;
    removeElements();
    createCanvas(windowWidth, windowHeight - 60);
    newTheme = localStorage.theme;
    background(gray[newTheme]["bg"]);
    theme = newTheme;
    bigDiv = createDiv();
    bigDiv.class("flex w-screen items-center justify-center");
    bigDiv.style("height", windowHeight - 60 + "px");
    bigDiv.position(0, 60);
    typingDiv = createDiv();
    typingDiv.parent(bigDiv);
    typingDiv.class("m-4 text-center");
    currentLineBox = createElement(
        "p",
        "<span class=text-blue-500>> </span>" + currentLine
    );
    currentLineBox.parent(typingDiv);
    currentLineBox.class(
        "p-2 my-2 rounded text-xl font-mono text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-800"
    );
    // currentLineBox.position(0, 60);
    otherLinesBox = createElement("p", otherLines);
    otherLinesBox.parent(typingDiv);
    otherLinesBox.class(
        "whitespace-pre-line my-2 text-md font-mono text-gray-400 dark:text-gray-600"
    );
    // otherLinesBox.position(0, 120);
}

function windowResized() {
    setup();
}

function keyTyped() {
    if (currentChar == 0 && lineId == 0) {
        timeStart = Date.now();
    }
    typed += key;
    currentChar++;
    showTyping();
    if (typed == currentLine) {
        if (lineId == quoteLength - 1) {
            success(Date.now() - timeStart);
        }
        lineId++;
        lines.shift();
        currentLine = lines[0];
        typed = "";
        currentChar = 0;
        indexOfNewline = otherLines.indexOf("\n");
        if (indexOfNewline == -1) {
            otherLines = "";
        } else {
            otherLines = otherLines.substring(otherLines.indexOf("\n") + 1);
        }
        currentLineBox.html(
            "<span class=text-blue-500>> </span>" + currentLine
        );
        otherLinesBox.html(otherLines);
    }
}

function keyPressed() {
    if (keyCode == BACKSPACE && currentChar > 0) {
        typed = typed.substring(0, typed.length - 1);
        currentChar--;
        showTyping();
    }
}

function draw() {
    // fill("black");
    // rect(100, 80, 20, 20);
    // fill("white");
    // textSize(20);
    // text(currentChar, 100, 100);
    newTheme = localStorage.theme;
    if (theme != newTheme) {
        background(gray[newTheme]["bg"]);
        theme = newTheme;
    }
}
