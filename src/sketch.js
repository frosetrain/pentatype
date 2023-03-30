function setup() {
    removeElements();
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    setup();
    //resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(localStorage.theme === "dark" ? "#0f172a" : "#f1f5f9");
}
