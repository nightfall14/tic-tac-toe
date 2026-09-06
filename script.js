let boxs = document.querySelectorAll('.box');
let winCont = document.querySelector('.winCont');
let winContainer = document.querySelector('.winner');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-game');
let turn = document.querySelector('h2');
let playX = true;
const click_sound = new Audio('/tic-tac-toe-sounds/click.wav');
const game_win = new Audio('/tic-tac-toe-sounds/freesound_community-goodresult-82807.mp3');
const game_draw = new Audio('/tic-tac-toe-sounds/mixkit-circus-lose-2030.wav');
const click_btn = new Audio('/tic-tac-toe-sounds/freesoundeffects-button-click-289742.mp3');

let winingPatt= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let counter = 0; 

boxs.forEach((box) => {
    box.addEventListener('click', () => {
        if (playX){
            box.innerText = "x";
            turn.innerText = "O's Turn";
            playX = false;
            turn.innerText = "X's Turn";
            } else {
            box.innerText = "o";
            turn.innerText = "X's Turn";
            playX = true
            turn.innerText = "O's Turn";
        }
        click_sound.currentTime = 0;
        click_sound.play();
        box.disabled = true;
        counter++;
        const hasWinner= checkWinner();
        if (!hasWinner){  //got through gpt-4. so that draw doesn't overrides the last win.
            checkDraw();
        }
    })
})

const checkDraw= () => {
    if (counter >= boxs.length){
        winCont.innerText = "This is a Draw";
        winContainer.classList.remove('hide');
        counter = 0;
        game_draw.play();
    }
}

const disableAll = () => {
    for (let box of boxs){
        box.disabled = true;
    }
}
const reset = () => {
    for (let box of boxs){
        box.disabled = false;
        box.innerText = "";
        box.setAttribute('class', 'box');
    }
        winContainer.classList.add('hide');
        counter= 0;
        playX = true;
        click_btn.play();
}

const checkWinner = () => {
    for (let patt of winingPatt){
        let pos1Val = boxs[patt[0]].innerText;
        let pos2Val = boxs[patt[1]].innerText;
        let pos3Val = boxs[patt[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val != ""){
            if (pos1Val === pos2Val && pos2Val === pos3Val){
                winCont.innerText = "Winner is "+ pos1Val.toUpperCase();
                boxs[patt[0]].classList.add('win-box');
                boxs[patt[1]].classList.add('win-box');
                boxs[patt[2]].classList.add('win-box');
                winContainer.classList.remove('hide');
                disableAll();
                game_win.play();
                return true;
            }

        }
    }
    return false;
}

newGameBtn.addEventListener('click', () => {
    reset();
})

resetBtn.addEventListener('click', () => {
   reset();
})
