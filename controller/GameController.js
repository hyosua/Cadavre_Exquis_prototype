import { GameModel } from "../model/GameModel.js";
import { GameView } from "../view/GameView.js";

export class GameController {
    constructor(){
        this.model = new GameModel;
        this.view = new GameView(this);
        
        this._updateView();
    }

    // Met à jour l'interface ui
    _updateView(){
        this.view.clearDisplay();
        const state = this.model.getState();
        console.log("state:",state)
        this.view.displayWordcount(state.wordCount, state.maxWords);

        // Afficher Le type de mot à entrer et à qui le tour
        this.view.displayRoundType(state.currentRound);
        this.handlePlayerDisplay(state.currentPlayer);
        
        //Afficher les mots
        if(state.wordCount>0){
            state.words.forEach((wordObj,index) => {
                this.view.displayWord(
                    wordObj.word, 
                    wordObj.type,
                    wordObj.player,
                    index,
                    state.words.length,
                );
            });
        }
        
        //Montrer le bouton READY si la phrase est terminée
        if(state.isCompleted){
            this.view.disableInput();
            this.view.displayReadyButton();
        }else{
            this.view.resetView();
        }
    }

    handleAddWord(word) {
        const result = this.model.addWord(word);
        if(result.success){
            this.model.nextRound();
            this._updateView();
        }else{
            this.view.disableInput();
            this.view.displayMessage(result.message);
        }
    }

    handleRemoveLastWord(){
        this.model.removeLastWord();
        this._updateView();
    }

    handleReset(){
        this.model.reset();
        this._updateView();
    }

    getFinalPhrase(){
        return this.model.words;
    }

    handlePlayerDisplay(currentPlayer){
        //si la partie est en cours, on affiche à qui le tour
        if( this.model.isGameCompleted() ){
            this.view.showFinishInfo();
        }else{
            this.view.displayPlayerName(currentPlayer);
        }
    }

}