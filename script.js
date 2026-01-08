const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const pvpBtn = document.getElementById("pvp");
const aiBtn = document.getElementById("ai");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = false;
let vsAI = false;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

pvpBtn.onclick = () => startGame(false);
aiBtn.onclick = () => startGame(true);

function startGame(aiMode) {
    vsAI = aiMode;
    gameActive = true;
    resetBoard();
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!gameActive || board[index] !== "") return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        if (checkWinner()) return;

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;

        if (vsAI && currentPlayer === "O") {
            setTimeout(aiMove, 500);
        }
    });
});

function aiMove() {
    const emptyCells = board
        .map((v, i) => v === "" ? i : null)
        .filter(v => v !== null);

    const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    cells[move].click();
}

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a,b,c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            pattern.forEach(i => cells[i].classList.add("win"));
            statusText.textContent = `🎉 Player ${board[a]} Wins!`;
            gameActive = false;
            return true;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "🤝 It's a Draw!";
        gameActive = false;
        return true;
    }
    return false;
}

function resetBoard() {
    board = ["","","","","","","","",""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell";
    });
    currentPlayer = "X";
}

resetBtn.onclick = () => {
    gameActive = false;
    statusText.textContent = "Select a mode to begin";
    resetBoard();
};
