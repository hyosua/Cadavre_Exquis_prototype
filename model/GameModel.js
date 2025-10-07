import { CONFIG } from "../config/constants.js";

export class GameModel  {
    constructor() {
        this.words = [];
        this.roundIndex = 0;
        this.rounds = CONFIG.rounds;
        this.players = CONFIG.players;
        this.maxWords = this.rounds.length;
    }
    

    getState(){
        return {
            words: [...this.words],
            currentRound: this.rounds[this.roundIndex],
            currentPlayer: this.players[this.roundIndex],
            currentRoundIndex: this.roundIndex,
            maxWords: this.maxWords,
            wordCount: this.words.length,
            isCompleted: this.isGameCompleted()
        }
    }

    isGameCompleted(){
        return this.words.length >= this.maxWords;
    }

    addWord(word) {
        let message = '';
        let success = true;

        if(this.isGameCompleted()){
            success = false;
            message = "Fin de partie"
        }

        const wordObj = {
            word: word.trim(),
            type: this.rounds[this.roundIndex]
        }

        this.words.push(wordObj)
        if(this.roundIndex < this.rounds.length){
            this.roundIndex++;
        }

        return {success, message};
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

