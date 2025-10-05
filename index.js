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

/* VARIABLES GLOBALES */
const rounds=['nom commun','adjectif','verbe', 'nom commun', 'circonstance'];
let roundIndex=0;
const maxWords = rounds.length;
let words=[];

/* BOUTONS */
const showBtn = document.createElement('button');
const delBtn = document.createElement('button');
delBtn.classList.add('actionBtn');
showBtn.classList.add('actionBtn');
delBtn.textContent = '❌';
showBtn.textContent = '👁️';

/* MOUSE EVENTS */
delBtn.addEventListener("click", () => {
  words.pop();
  roundIndex--;
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
  roundIndex = 0;
  words=[];
  render();
})


/* FUNCTIONS */

/* RENDER */
const render = () => {
  const isRevealRound = words.length === rounds.length;
  
  clearDisplay();
  round.textContent = rounds[roundIndex];
  if(words.length > 0){
  createWords();
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
  displayWordCount(words.length);
}

/* CLEAR DISPLAY */
const clearDisplay = () => {
  ul.replaceChildren();
}

/* Create Words */
const createWords = () => {
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

/* Afficher COMPTEUR DE MOTS */
const displayWordCount = (count) => {
  countDiv.innerHTML = `${count}/${maxWords}`;
  countDiv.style.color = count === maxWords ? 'red' : 'green';
}


/* AJOUTER UN MOT */
const addWord = () => {
  const word= wordInput.value.trim();

  if(word == ''){
    return;
  }

words.push({word: word, type: round.textContent});
  wordInput.value='';
  wordInput.focus();
  roundIndex++;
  render();
}

/* MONTRER LE REVEAL BUTTON */
const showRevealButton = () => {
  revealBtn.classList.add('show');
}

/* REVELER LA PHRASE */
const revealPhrase = () =>{
  clearDisplay();
  words.forEach((w,i) => {
    setTimeout(()=>{
    const li = document.createElement('li');
    li.textContent = w.word;
    li.classList.add('enter'); 
    ul.appendChild(li);
    }, 1000  * i);
    
  })
}

render();

