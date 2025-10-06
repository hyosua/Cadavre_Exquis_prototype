import { CONFIG } from './constants.js'
import { GameModel } from './GameModel.js';

/* Modèle */
const model = new GameModel();

/* DOM ELEMENTS */
const inputContainer = document.querySelector('.input-container');
const addBtn = document.querySelector('.add');
const resetBtn = document.querySelector('.reset');
const displayPanel = document.getElementById('display');
const wordInput = document.getElementById('input');
const ul = document.getElementById('list');
const errorDiv = document.querySelector('.error');
const countDiv = document.querySelector('.word-count');
const round = document.getElementById('round');
const revealBtn = document.querySelector('.revealBtn');


/* BOUTONS */
const showBtn = document.createElement('button');
const delBtn = document.createElement('button');
delBtn.classList.add('actionBtn');
showBtn.classList.add('actionBtn');
delBtn.textContent = '❌';
showBtn.textContent = '👁️';

/* MOUSE EVENTS */
delBtn.addEventListener("click", () => {
  model.removeLastWord();
  render();
})

showBtn.addEventListener("mousedown", () => {
  const li = showBtn.closest('li');
  li.firstChild.textContent = li.dataset.word;
})

showBtn.addEventListener("mouseup", () => {
  const li = showBtn.closest('li');
  li.firstChild.textContent = '...';
})

showBtn.addEventListener('mouseleave', () => {
  const li = showBtn.closest('li');
  li.firstChild.textContent = '...'; // au cas où la souris sort
});

revealBtn.addEventListener('click', () => {
  revealPhrase();
  revealBtn.classList.remove('show');
})

/* ADD BY CLICK */
addBtn.addEventListener('click', ()=>{
  addWord();
})

/* ADD by ENTER KEY */
wordInput.addEventListener('keydown', function(e){
   if(e.key === "Enter"){
  e.preventDefault();
  addWord();
  }               
})

/* RESET */
resetBtn.addEventListener('click', ()=>{
  model.reset();
  render();
})


/* FUNCTIONS */

const render = () => {
  const state = model.getState();
  
  clearDisplay();
  round.textContent = state.currentRound;
  displayPlayerName(state.currentRoundIndex);
  if(state.wordCount > 0){
  createWords(state.wordList);
  }
  if(state.isCompleted){
    round.textContent = 'Final Reveal';
    wordInput.disabled = true;
    addBtn.disabled = true;
    showRevealButton();
  }else{
    addBtn.disabled = false;
    wordInput.disabled = false;
  }
  console.log("Model state:", state)
  displayWordCount(state.wordCount, state.maxWords);
}

const clearDisplay = () => {
  ul.replaceChildren();

}

const createWords = (words) => {
  words.forEach((w,idx) => {
    const li = createLi(w, idx, words.length);
    ul.appendChild(li);
  })
}

const createLi = (wordObj, idx, lastIndex) => {
   const li = document.createElement('li');
    const wordType = document.createElement('span');
    wordType.textContent = wordObj.type;
    wordType.classList.add('type');
    li.textContent= "...";
    if(idx === lastIndex - 1){
      li.textContent = wordObj.word;
      li.append(delBtn);
    }else if(idx === lastIndex - 2){
      li.append(showBtn);
      li.dataset.word = wordObj.word;
    }
    li.append(wordType);
    li.classList.add('enter');
    return li;
}

const showError = (message) => {
  wordInput.value ='';  
  errorDiv.textContent = message;
  errorDiv.classList.add('active');
  setTimeout(() => errorDiv.classList.remove('active'), 4000);
}

const displayWordCount = (count, max) => {
  countDiv.innerHTML = `${count}/${max}`;
  countDiv.style.color = count === max ? 'red' : 'green';
}

const displayPlayerName = (roundIndex) => {
  const playerRound = document.getElementById('playerRound');
    playerRound.replaceChildren();
  if(roundIndex < CONFIG.rounds.length){
    const playerName = document.createElement('span');
    const yourTurn = document.createElement('span');

    playerName.classList.add('playerName');
    playerName.textContent = model.players[roundIndex];
    yourTurn.textContent = " à toi de jouer!"
    playerRound.append(playerName, yourTurn);
  }
}

const addWord = () => {
  const word = wordInput.value.trim();
  const ok = model.addWord(word);
  console.log("model.addword:",ok)
  if(!ok){
    return;
  }
  wordInput.value='';
  wordInput.focus();
  render();
}

const showRevealButton = () => {
  revealBtn.classList.add('show');
}

const revealPhrase = () =>{
  clearDisplay();
  const {wordList} = model.getState();
  wordList.forEach((w,i) => {
    setTimeout(()=>{
    const li = document.createElement('li');
    li.textContent = w.word;
    li.classList.add('enter'); 
    ul.appendChild(li);
    }, 1000  * i);
    
  })
}

render();

