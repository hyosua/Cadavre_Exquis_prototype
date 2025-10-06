import { CONFIG } from './constants.js'
import { STATE } from './state.js';

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
  STATE.words.pop();
  CONFIG.roundIndex--;
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
  CONFIG.roundIndex = 0;
  STATE.words=[];
  render();
})


/* FUNCTIONS */

const render = () => {
  const isRevealRound = STATE.words.length === CONFIG.rounds.length;
  
  clearDisplay();
  round.textContent = CONFIG.rounds[STATE.roundIndex];
  displayPlayerName(STATE.roundIndex);
  if(STATE.words.length > 0){
  createWords(STATE.words);
  }
  if(isRevealRound){
    round.textContent = 'Final Reveal';
    wordInput.disabled = true;
    addBtn.disabled = true;
    showRevealButton();
  }else{
    addBtn.disabled = false;
    wordInput.disabled = false;
  }
  displayWordCount(STATE.words.length);
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

const displayWordCount = (count) => {
  countDiv.innerHTML = `${count}/${STATE.maxWords}`;
  countDiv.style.color = count === STATE.maxWords ? 'red' : 'green';
}

const displayPlayerName = (roundIndex) => {
  const playerRound = document.getElementById('playerRound');
    playerRound.replaceChildren();
  if(roundIndex < CONFIG.rounds.length){
    const playerName = document.createElement('span');
    const yourTurn = document.createElement('span');

    playerName.classList.add('playerName');
    playerName.textContent = CONFIG.players[roundIndex];
    yourTurn.textContent = " à toi de jouer!"
    playerRound.append(playerName, yourTurn);
  }
}

const addWord = () => {
  const word= wordInput.value.trim();

  if(word == ''){
    return;
  }

  STATE.words.push({word: word, type: round.textContent});
  wordInput.value='';
  wordInput.focus();
  STATE.roundIndex++;
  render();
}

const showRevealButton = () => {
  revealBtn.classList.add('show');
}

const revealPhrase = () =>{
  clearDisplay();
  STATE.words.forEach((w,i) => {
    setTimeout(()=>{
    const li = document.createElement('li');
    li.textContent = w.word;
    li.classList.add('enter'); 
    ul.appendChild(li);
    }, 1000  * i);
    
  })
}

render();

