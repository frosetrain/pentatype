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

let currentChar = 0;
let typed = "";
let quote = `Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date:
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm'd;
And every fair from fair sometime declines,
By chance or nature's changing course untrimm'd;
But thy eternal summer shall not fade
Nor lose possession of that fair thou owest;
Nor shall Death brag thou wander'st in his shade,
When in eternal lines to time thou growest:
So long as men can breathe or eyes can see,
So long lives this and this gives life to thee.`;
let lines = quote.split("\n");
let quoteLength = lines.length;
let lineId = 0;
let currentLine = lines[0];
let otherLines = quote.substring(quote.indexOf("\n") + 1);
let otherLinesBox;
let theme;
let timeStart;

function showTyping() {
    let firstError = currentChar;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] != currentLine[i]) {
            firstError = i;
            break;
        }
    }
    currentLineBox.html(
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
    removeElements();
    createCanvas(windowWidth, windowHeight - 60);
    newTheme = localStorage.theme;
    background(gray[newTheme]["bg"]);
    theme = newTheme;
    typingDiv = createDiv();
    typingDiv.class("m-5");
    typingDiv.position(0, 60);
    currentLineBox = createElement("p", currentLine);
    currentLineBox.parent(typingDiv);
    currentLineBox.class(
        "p-2 my-2 rounded text-xl font-mono text-gray-500 dark:text-gray-500 bg-gray-200 dark:bg-gray-800"
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
        console.log("start");
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
        console.log(indexOfNewline);
        if (indexOfNewline == -1) {
            otherLines = "";
        } else {
            otherLines = otherLines.substring(otherLines.indexOf("\n") + 1);
        }
        console.log(otherLines);
        currentLineBox.html(currentLine);
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
