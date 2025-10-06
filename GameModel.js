import { CONFIG } from "./constants.js";

export class GameModel  {
    constructor() {
        this.words = [];
        this.roundIndex = 0;
        this.rounds = CONFIG.rounds;
        this.players = CONFIG.rounds;
        this.maxWords = this.rounds.length;
    }
    

    getState(){
        return {
            wordList: [...this.words],
            currentRound: this.rounds[this.roundIndex],
            currentPlayer: this.rounds.this.roundIndex,
            currentRoundIndex: this.roundIndex,
            maxWords: this.maxWords,
            wordCount: this.words.length,
            isCompleted: this.isGameCompleted()
        }
    }

    isGameCompleted(){
        return this.wordCount >= this.maxWords;
    }

    addWord(word) {
        if(!word || word.trim() == ''){
            return false;
        }

        if(this.isGameCompleted()){
            return false;
        }

        const wordObj = {
            word: word.trim(),
            type: this.currentRound
        }

        this.words.push(wordObj)
        this.roundIndex++;
    }
    
    removeLastWord() {
        this.words.pop();
        this.roundIndex--;
    }

    reset() {
        this.roundIndex = 0;
        this.words = [];
    }
}

