/* DOM ELEMENTS */
const inputContainer = document.querySelector('.input-container');
const add = document.querySelector('.add');
const reset = document.querySelector('.reset');
const display = document.getElementById('display');
const wordInput = document.getElementById('input');
const ul = document.getElementById('list');
const errorDiv = document.querySelector('.error');
const countDiv = document.querySelector('.word-count');
const round = document.getElementById('round');
const revealBtn = document.querySelector('.revealBtn');

/* VARIABLES GLOBALES */
const rounds=['nom commun','adjectif','verbe', 'nom commun', 'circonstance', 'Fin'];
let roundIndex=0;
const maxWords = 5;
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
})

/* ADD BY CLICK */
add.addEventListener('click', ()=>{
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
reset.addEventListener('click', ()=>{
  roundIndex = 0;
  words=[];
  render();
})


/* FUNCTIONS */

/* RENDER */
const render = () => {
  const isRevealRound = words.length === rounds.length - 1;
  
  clearDisplay();
  round.textContent = rounds[roundIndex];
  if(words.length > 0){
  createWords();
  }
  if(isRevealRound){
    wordInput.disabled = true;
    add.disabled = true;
    showRevealButton();
  }else{
    add.disabled = false;
    wordInput.disabled = false;
  }
  displayWordCount(words.length);
}

/* CLEAR DISPLAY */
const clearDisplay = () => {
  while(ul.firstChild){
    ul.firstChild.remove();
  }
}

/* Create Words */
const createWords = () => {
  words.forEach((w,idx) => {
    const li = document.createElement('li');
    const wordType = document.createElement('span');
    wordType.textContent = w.type;
    wordType.classList.add('type');
    li.textContent= "...";
    if(idx === words.length - 1){
      li.textContent = w.word;
      li.append(delBtn);
    }else if(idx === words.length - 2){
      li.append(showBtn);
      li.classList.add('.')
      li.dataset.word = w.word;
    }
    li.append(wordType);
    li.classList.add('enter'); 
    ul.appendChild(li);
  })
}

/* Show Error Message */
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
  
  if(words.length === maxWords){
    showError("Le nombre de mots maximum a été atteint");
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

