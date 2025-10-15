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
        const n = this.rounds.length;
        const playerIdx = n % this.players.length
        const prevIdx = (playerIdx - 1 + this.players.length) % this.players.length;

        return {
            playerIndex: playerIdx,
            words: [...this.words],
            currentRound: this.rounds[this.roundIndex],
            currentPlayer: this.players[playerIdx],
            previousPlayer: this.players[prevIdx],
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

        if(this.isGameCompleted())return false
        if(!word) return false

        const n = this.words.length
        const playerIdx = n % this.players.length

        const wordObj = {
            word: word.trim(),
            type: this.rounds[n],
            player: this.players[playerIdx],
        }
        
        this.words.push(wordObj)
        this.roundIndex = this.words.length
        this.playerIndex = this.words.length % this.players.length
        return true;
    }
    
    removeLastWord() {
        if(!this.words.length) return false
        this.words.pop();
        
        this.roundIndex = this.words.length
        this.playerIndex = this.words.length % this.players.length
        return true
    }

    reset() {
        this.roundIndex = 0;
        this.words = [];
        this.playerIndex = 0;
    }

    

}

