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
let quote = "I'd just like to interject for a moment.";
let quoteBox;
let typedBox;
let errorBox;
let theme;

function setup() {
    removeElements();
    createCanvas(windowWidth, windowHeight - 60);
    newTheme = localStorage.theme;
    background(gray[newTheme]["bg"]);
    theme = newTheme;
    quoteBox = createElement("p", quote);
    quoteBox.class("text-xl font-mono text-gray-400 dark:text-gray-600");
    quoteBox.position(30, height / 2 + 46);
    typedBox = createElement("p", typed);
    typedBox.class(
        "text-xl font-mono text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900"
    );
    typedBox.position(30, height / 2 + 46);
    errorBox = createElement("p", "");
    errorBox.class("text-xl font-mono text-red-700 dark:text-red-500");
    errorBox.position(30, height / 2 + 46);
}

function windowResized() {
    setup();
}

function keyTyped() {
    typed += key;
    if (typed != quote.substring(0, currentChar + 1)) {
        let firstError;
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] != quote[i]) {
                firstError = i;
                break;
            }
        }
        errorBox.html(
            "<pre>" +
                " ".repeat(firstError) +
                typed
                    .substring(firstError, currentChar + 1)
                    .replaceAll(" ", "_") +
                "</pre>"
        );
        typedBox.html(
            "<pre>" +
                typed.substring(0, firstError) +
                " ".repeat(currentChar - firstError + 1) +
                "</pre>"
        );
    } else {
        typedBox.html("<pre>" + typed + "</pre>");
    }
    currentChar++;
}

function keyPressed() {
    if (keyCode == BACKSPACE && currentChar > 0) {
        typed = typed.substring(0, typed.length - 1);
        currentChar--;
        if (typed != quote.substring(0, currentChar)) {
            let firstError;
            for (let i = 0; i < typed.length; i++) {
                if (typed[i] != quote[i]) {
                    firstError = i;
                    break;
                }
            }
            errorBox.html(
                "<pre>" +
                    " ".repeat(firstError) +
                    typed
                        .substring(firstError, currentChar)
                        .replaceAll(" ", "_") +
                    "</pre>"
            );
            typedBox.html(
                "<pre>" +
                    typed.substring(0, firstError) +
                    " ".repeat(currentChar - firstError) +
                    "</pre>"
            );
        } else {
            errorBox.html("");
            typedBox.html("<pre>" + typed + "</pre>");
        }
    }
}

function draw() {
    // fill("black");
    // rect(100, 90, 10, 10);
    // fill("white");
    // text(currentChar, 100, 100);
    newTheme = localStorage.theme;
    if (theme != newTheme) {
        background(gray[newTheme]["bg"]);
        theme = newTheme;
    }
}
