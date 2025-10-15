 import { CONFIG } from "../config/constants.js";
import { GameController } from "../controller/GameController.js";
 import { Word } from "./components/Word.js";

 export class GameView{
    constructor(){
        // intialisation des hooks à null
        this._onAddWordCallback = null;
        this._onResetCallback = null;
        this._onRevealCallback = null;

        this.elements = this.getElements();
        this.word = new Word()
        this._bindEvents();
    }
 

    getElements(){
        return {
            inputContainer : document.querySelector('.input-container'),
            displayPanel : document.getElementById('display'),
            wordInput : document.getElementById('input'),
            ulWordlist : document.getElementById('list'),
            progressDiv: document.querySelector('.progress'),
            errorDiv : document.querySelector('.error'),
            countDiv : document.querySelector('.word-count'),
            round : document.querySelector('.round'),
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
        this.elements.readyButton.addEventListener('click', ()=> this.handleReveal());
        this.elements.wordInput.addEventListener('keydown', (e) => this.handleEnterKey(e));
    }

    clearDisplay(){
        this.elements.ulWordlist.replaceChildren();
    }

    showDisplayContainer(){
        this.elements.displayPanel.style.opacity = '100%';
    }

    hideDisplayContainer(){
        this.elements.displayPanel.style.opacity = '0%';
    }

    hideInput(){
        this.elements.inputContainer.style.display = 'none'
    }

    showInput(){
        this.elements.inputContainer.style.display = 'block'
    }

    displayWord(word, type, player, index, totalWords) {
        const wordObj = new Word(
            word, 
            type, 
            index, 
            totalWords,
            this.handleRemoveLastWord.bind(this),
            player
        );
        const li = wordObj.createWord();

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
        this.elements.countDiv.textContent = `Round: ${count} / ${max}`;
        this.elements.countDiv.style.color = count === max ? 'var(--error)' : 'var(--accent)'; 
    }

    displayProgress(progress){
        this.elements.progressDiv.style.width = `${progress}%`;
    }

    displayPlayerName(playerObj){
        this.elements.playerName.textContent = playerObj.username;
        this.elements.playerName.style.backgroundColor = playerObj.color;
    }

    hidePlayername(){
        // this.elements.playerName.textContent='';
    }

    showFinishInfo(){
        this.elements.round.textContent = 'Phrase Terminée'
        this.elements.playerName.classList.add("hidden")
        this.elements.yourTurn.textContent='Cliquez sur Ready pour continuer'
    }

    displayReadyButton(){
        this.elements.readyButton.classList.add('show');        
    }

    displayRoundType(currentRound){
        this.elements.round.textContent = currentRound;
        this.elements.wordInput.placeholder = `Entrer un${currentRound.toLowerCase() === 'circonstance' ? "e" : ""} ${currentRound}`      
    }

    displayFinalPhrase(phrase){
        this.elements.readyButton.classList.remove('show');
        this.clearDisplay();

        phrase.forEach((wordObj, i) => {
            setTimeout(()=>{
                const li = document.createElement('li');
                li.textContent = wordObj.word;
                console.log("displayFinalPhrase, player:", wordObj.player)
                li.style.backgroundColor = wordObj.player.color;
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
        this.elements.addBtn.style.backgroundColor = 'lightgrey';
    }

    enableInput(){
        this.elements.wordInput.disabled = false;
        this.elements.addBtn.disabled = false;
        this.elements.addBtn.style.backgroundColor = 'var(--neutral)';

    }

    resetView(){
        this.elements.readyButton.classList.remove("show");
        this.elements.playerName.classList.remove("hidden");
        this.elements.yourTurn.textContent = ", à ton tour!"
        this.elements.wordInput.value = '';
        this.enableInput();
    }

    // Hooks 
    onAddWord(callback){
        this._onAddWordCallback = callback;
    }

    onReset(callback){
        this._onResetCallback = callback;
    }

    onReveal(callback){
        this._onRevealCallback = callback;
    }

    onDeleteWord(callback){
        this._onDeleteWordCallback = callback;
    }

    handleAddWord(){
        const word = this.elements.wordInput.value.trim();
        const inputField = this.elements.wordInput;
        if(!word || word == ''){
            return
        }

        if(this._onAddWordCallback){
            this._onAddWordCallback(word);
        }

        inputField.focus();
    }

    handleEnterKey(e){
        if(e.key === "Enter"){
            e.preventDefault();
            this.handleAddWord();
        }
    }

    handleRemoveLastWord(){
        if(this._onDeleteWordCallback){
            this._onDeleteWordCallback();
        }
    }

    handleReset(){
        if(this._onResetCallback){
            this._onResetCallback();
        }

        this.resetView();
    }

    handleReveal(){

        if(this._onRevealCallback){
            const phrase = this._onRevealCallback();
            this.displayFinalPhrase(phrase);
        }
        
    }
}
