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

let controlChars = [8, 46, 13, 9, 27, 16, 17, 18, 38, 40, 37, 39];
let typed = "";
let quote = "Lorem Ipsum";
let quoteBox;
let typedBox;

function setup() {
    removeElements();
    createCanvas(windowWidth, windowHeight - 60);
    quoteBox = createElement("p", quote);
    quoteBox.id("quoteBox");
    quoteBox.class("text-xl font-mono text-gray-400 dark:text-gray-600");
    quoteBox.position(30, height / 2 + 60);
    typedBox = createElement("p", typed);
    typedBox.id("typedBox");
    typedBox.class(
        "text-xl font-mono text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900"
    );
    typedBox.position(30, height / 2 + 60);
}

function windowResized() {
    setup();
}

function keyTyped() {
    typed += key;
    document.getElementById("typedBox").innerHTML = typed;
}

function keyPressed() {
    if (keyCode == BACKSPACE) {
        typed = typed.substring(0, typed.length - 1);
        document.getElementById("typedBox").innerHTML = typed;
    }
}

function draw() {
    theme = localStorage.theme;
    background(gray[theme]["bg"]);
    noStroke();
    // text(typed, 30, height / 2);
}
