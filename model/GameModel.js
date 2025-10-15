import { CONFIG } from "../config/constants.js";

export class GameModel  {
    constructor(config) {
        this.words = [];
        this.players = config.players || [];
        this.roundIndex = 0;
        this.playerIndex = 0;
        this.rounds = config.rounds;
        this.maxWords = this.rounds.length;
    }
    

    getState(){
        return {
            words: [...this.words],
            currentRound: this.rounds[this.roundIndex],
            currentPlayer: this.players[this.playerIndex],
            previousPlayer: this.players[(this.playerIndex - 1) || 0],
            progress: ((this.roundIndex * this.players.length + this.playerIndex) / (this.rounds.length * this.players.length)) * 100,
            currentRoundIndex: this.roundIndex,
            maxWords: this.maxWords,
            wordCount: this.words.length,
            isCompleted: this.isGameCompleted(),
        }
    }

    isGameCompleted(){
        return this.words.length >= this.maxWords;
    }

    addWord(word) {

        if(this.isGameCompleted()){
            return false;
        }

        const wordObj = {
            word: word.trim(),
            type: this.rounds[this.roundIndex],
            player: this.players[this.playerIndex],
        }

        this.words.push(wordObj)
        this.nextRound();

        return true;
    }
    
    removeLastWord() {
        this.words.pop();
        this.roundIndex--;
    }

    reset() {
        this.roundIndex = 0;
        this.words = [];
        this.playerIndex = 0;
    }

    

    nextRound(){
        if(this.roundIndex < this.rounds.length){
            this.roundIndex++;
            this.playerIndex = (this.playerIndex + 1) % this.players.length;
        }
    }

}

