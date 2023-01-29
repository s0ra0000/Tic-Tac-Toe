const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let xPlayerScoreText = document.getElementById('xScore');
let oPlayerScoreText = document.getElementById('oScore');

let isPlayer_O_Turn = false
let xPlayerScore = 0;
let oPlayerScore = 0;
startGame()

restartButton.addEventListener('click',startGame)

function startGame(){
    cellElements.forEach(cell =>{
        cell.classList.remove('not-allowed');
        cell.classList.remove('winning-bg')
    })
    isPlayer_O_Turn = false
    cellElements.forEach(cell => {
        cell.classList.remove(PLAYER_X_CLASS)
        cell.classList.remove(PLAYER_O_CLASS)
        cell.removeEventListener('click',handleCellClick)
        cell.addEventListener('click',handleCellClick,{once:true})
    })
    setBoardHoverClass()
    winningMessageTextElement.classList.remove('show')
}

function handleCellClick(e){
    const cell = e.target
    const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = "Its a draw!"
    }else{
        cellElements.forEach(cell =>{
            cell.classList.add('not-allowed');
        })
        winningMessageTextElement.innerText = `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`
        if(!isPlayer_O_Turn){
            xPlayerScore = ++xPlayerScore;
            xPlayerScoreText.innerText = xPlayerScore

        } else{
            oPlayerScore = ++oPlayerScore;
            oPlayerScoreText.innerText = oPlayerScore
        }
    }
    winningMessageTextElement.classList.add('show')
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}
function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS)
	boardElement.classList.remove(PLAYER_O_CLASS)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(PLAYER_O_CLASS)
	} else {
		boardElement.classList.add(PLAYER_X_CLASS)
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
        if(combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})){
            combination.forEach(index =>{
                cellElements[index].classList.add('winning-bg');
            })
            return true;
        } else{
            return false;
        }
	})
}