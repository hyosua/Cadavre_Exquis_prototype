 import { GameController } from "../controller/GameController.js";
 
 export class GameView{
    constructor(GameController){
        this.controller = GameController;
        this.elements = this.getElements();
        
        this._bindEvents();
    }
 

    getElements(){
        return {
            inputContainer : document.querySelector('.input-container'),
            displayPanel : document.getElementById('display'),
            wordInput : document.getElementById('input'),
            ulWordlist : document.getElementById('list'),
            errorDiv : document.querySelector('.error'),
            countDiv : document.querySelector('.word-count'),
            round : document.getElementById('round'),
            playerRound : document.getElementById('playerRound'),
            yourTurn : document.getElementById('yourTurn'),
            playerName : document.querySelector('.playerName'),
            /* BOUTONS */
            resetBtn : document.querySelector('.reset'),
            addBtn : document.querySelector('.add'),
            readyButton : document.querySelector('.readyBtn'),
        }
    }

    _bindEvents(){
        this.elements.addBtn.addEventListener('click', () => this.handleAddWord());
        this.elements.resetBtn.addEventListener('click', ()=> this.handleReset());
        this.elements.readyButton.addEventListener('click', ()=> this.displayFinalPhrase());
        this.elements.wordInput.addEventListener('keydown', (e) => this.handleEnterKey(e));
    }

    clearDisplay(){
        this.elements.ulWordlist.replaceChildren();
    }

    displayWord(word, type, index, totalWords) {
        const li = document.createElement('li');
        li.textContent = '...';
        li.dataset.type = type;

        // On affiche à coté du mot le type correspondant au tour (Nom, Adj,...)
        const wordType = document.createElement('span');
        wordType.textContent = type;
        wordType.classList.add('type');

        //Bouton delete sur le dernier mot
        if(index == totalWords - 1){
            li.textContent = word;
            const delBtn = document.createElement("button");
            delBtn.classList.add('actionBtn');
            delBtn.textContent = '❌';
            delBtn.addEventListener('click', () => this.handleRemoveLastWord());
            li.append(delBtn);
        }
        //Bouton show sur le mot précédant
        if(index == totalWords - 2){
            li.textContent = word;
            const showBtn = document.createElement("button");
            showBtn.classList.add('actionBtn');
            showBtn.textContent = '👁️';
            showBtn.addEventListener('click', () => {
                li.textContent = li.textContent === '...' ? word : '...';
            });
            li.append(showBtn);
        }

        li.append(wordType);
        li.classList.add('enter');
        // Ajouter le mot à la liste (ul)
        this.elements.ulWordlist.appendChild(li);
    }

    displayMessage(message) {
        this.elements.wordInput.value = '';
        this.elements.errorDiv.textContent = message;
        this.elements.errorDiv.classList.add('active');
        setTimeout(() => errorDiv.classList.remove('active'), 4000);
    }

    displayWordcount(count, max){
        this.elements.countDiv.textContent = `${count}/${max}`;
        this.elements.countDiv.style.color = count === max ? 'red' : 'green'; 
    }

    displayPlayerName(name){
        this.elements.playerName.textContent = name;
    }

    hidePlayername(){
        this.elements.playerRound.replaceChildren();
    }

    showFinishInfo(){
        this.elements.round.textContent = 'Phrase Terminée'
        this.elements.playerRound.textContent = 'Cliquez sur Ready pour continuer';
    }

    displayReadyButton(){
        this.elements.readyButton.classList.add('show');        
    }

    displayRoundType(currentRound){
        this.elements.round.textContent = currentRound;        
    }

    displayFinalPhrase(){
        const phrase = this.controller.getFinalPhrase();
        this.elements.readyButton.classList.remove('show');
        this.clearDisplay();
        phrase.forEach((wordObj, i) => {
            setTimeout(()=>{
                const li = document.createElement('li');
                li.textContent = wordObj.word;
                li.classList.add('enter');
                this.elements.ulWordlist.append(li);
            }, 1000 * i)
        })
    }


    displayMessage = (message) => {
        this.elements.wordInput.value ='';  
        this.elements.errorDiv.textContent = message;
        this.elements.errorDiv.classList.add('active');
        setTimeout(() => this.elements.errorDiv.classList.remove('active'), 4000);
    }

    disableInput(){
        this.elements.wordInput.disabled = true;
        this.elements.addBtn.disabled = true;
    }

    enableInput(){
        this.elements.wordInput.disabled = false;
        this.elements.addBtn.disabled = false;
    }

    handleAddWord(){
        const word = this.elements.wordInput.value.trim();
        const inputField = this.elements.wordInput;
        if(!word || word == ''){
            return
        }
        this.controller.handleAddWord(word);
        inputField.value = '';
        inputField.focus();
    }

    handleEnterKey(e){
        if(e.key === "Enter"){
            e.preventDefault();
            this.handleAddWord();
        }
    }

    handleRemoveLastWord(){
        this.controller.handleRemoveLastWord();
    }

    handleReset(){
        this.controller.handleReset();
    }

}
