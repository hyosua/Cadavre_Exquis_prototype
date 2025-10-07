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

        // Afficher Le type de mot à entrer et à qui le tour
        this.view.displayRoundType(state.currentRound);
        this.handlePlayerName(state.currentPlayer);
        //Afficher les mots
        if(state.wordCount>0){
            this.view.displayWordcount(state.wordCount, state.maxWords);
            state.words.forEach((wordObj,index) => {
                this.view.displayWord(
                    wordObj.word, 
                    wordObj.type,
                    index,
                    state.words.length
                );
            });
        }
        
        //Montrer le bouton READY si la phrase est terminée
        if(state.isCompleted){
            this.view.disableInput();
            this.view.displayReadyButton();
        }else{
            this.view.enableInput();
        }
    }

    handleAddWord(word) {
        const result = this.model.addWord(word);
        if(result.success){
            this.view.displayWord();
        }else{
            this.view.displayMessage(result.message);
        }
        this._updateView();
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

    handlePlayerName(currentPlayer){
        //si la partie est en cours, on affiche à qui le tour
        if( this.model.isGameCompleted() ){
            this.view.hidePlayername();
            this.view.showFinishInfo();
        }else{
            this.view.displayPlayerName(currentPlayer);
        }
    }
}