const boards = [
    {
        cells: [
            ["E", "L", "W", "Y", "C"],
            ["Y", "L", "O", "A", "N"],
            ["U", "B", "L", "E", "E"],
            ["E", "L", "P", "M", "V"],
            ["P", "U", "R", "A", "U"]],
        words: ["CYAN", "YELLOW", "PURPLE", "MAUVE", "BLUE"]
    },
    {
        cells: [
            ["E", "K", "O", "A", "P"],
            ["A", "W", "L", "I", "R"],
            ["N", "S", "F", "A", "T"],
            ["L", "E", "E", "R", "A"],
            ["A", "G", "G", "U", "J"]],
        words: ["TAPIR", "EAGLE", "JAGUAR", "SNAKE", "WOLF"]
    },
    {
        cells: [
            ["H", "C", "N", "A", "N"],
            ["Y", "R", "A", "A", "A"],
            ["R", "E", "A", "Y", "B"],
            ["F", "P", "P", "E", "R"],
            ["I", "G", "A", "P", "A"]],
        words: ["CHERRY", "PAPAYA", "BANANA", "PEAR", "FIG"]
    },
]

function makeCellList() {
    let cells = Array.from(document.getElementById("cell-holder").children);
    let cellBoard = [];
    for (let i = 0; i < 5; i++) {
        cellBoard.push(cells.slice(i * 5, i * 5 + 5));
    }
    return cellBoard;
}
const CELLS = makeCellList();
console.log(CELLS);

function setupGame(board) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            CELLS[j][i].innerHTML = board[j][i];
        }
    }
}

setupGame(boards[0].cells);
document.getElementById("words").innerHTML = "Words to spell: " + boards[0].words.join(", ");

let selectedX = -1;
let selectedY = -1;

function select(x, y) {
    let cell = CELLS[y][x];
    if(cell.innerHTML.length>0){
        selectedX = x;
        selectedY = y;
        cell.classList.add("selected");
    }
}

function unselect(x, y) {

}


function move(x, y) {

}

function canMove(x, y) {

}

function onClick(x, y) {
    if (selectedX == x && selectedY == y) {
        unselect(x, y)
    } else if (canMove(x, y)) {
        move(x, y);
    } else {
        select(x, y);
    }

}