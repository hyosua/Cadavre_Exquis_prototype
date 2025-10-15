import { CONFIG } from "../config/constants.js";
import { GameModel } from "../model/GameModel.js";
import { GameView } from "../view/GameView.js";
import { SetupView } from "../view/SetupView.js";

export class GameController {
    constructor(){
        this.setupView = new SetupView();
        this.gameModel = null;
        this.gameView = null;

        this.currentConfig = { ...CONFIG };

        this.initSetup();
    }

    initSetup(){
        this.setupView.show();

        this.setupView.onStartGame((config) => {
            this.startGame(config);
        })
    }

    startGame(config){
        if(config.players < 2){
            alert("Minimum number of players: 2");
            return
        }
        
        this.setupView.hide();

        //Crée le modèle avec la config personnalisée
        this.gameModel = new GameModel(config);
        this.gameView = new GameView();

        //Initialisation du jeu
        this.initGameListeners();
        this._updateGameView();
    }

    initGameListeners(){
        this.gameView.onAddWord((word) => this.handleAddWord(word));
        this.gameView.onReset(() => this.handleReset());
        this.gameView.onReveal(() => this.handleReveal());
        this.gameView.onDeleteWord(() => this.handleRemoveLastWord());
        // this.gameView.onBackToSetup(() => this.backToSetup());
    }

    // Met à jour l'interface GameView
    _updateGameView(){
        this.gameView.clearDisplay();
        const state = this.gameModel.getState();
        console.log("state:",state)
        this.gameView.displayWordcount(state.wordCount, state.maxWords);
        this.gameView.displayProgress(state.progress);
        let currentRound = state.currentRound;
        let currentPlayer = state.currentPlayer;

        // Afficher Le type de mot à entrer et à qui le tour
        if(state.isCompleted){
            this.gameView.hideInput();
            currentRound = "Fin"                                                                                                                                                                
        }
        this.gameView.displayRoundType(currentRound);
        this.handlePlayerDisplay(currentPlayer);
        
        //Afficher les mots
        if(state.wordCount>0){
            this.gameView.showDisplayContainer();
            state.words.forEach((wordObj,index) => {
                this.gameView.displayWord(
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
            this.gameView.disableInput();
            this.gameView.displayReadyButton();
        }else{
            this.gameView.resetView();
        }
    }

    // Met à jour l'interface SetupView
    _updateSetupView(){
        const state = this.gameModel.getState();
        this.setupView.renderPlayers(state.players);
    }

    handleAddWord(word) {
        const success = this.gameModel.addWord(word);
        if(!success){
            window.alert("Impossible d'ajouter le mot");
        }
        this._updateGameView();
    }

    handleRemoveLastWord(){
        this.gameModel.removeLastWord();
        this.gameView.showInput();
        this._updateGameView();
    }

    handleAddPlayer(playerName) {
        success = this.gameModel.addPlayer(playerName);
        if(!success){
            window.alert("Impossible d'ajouter le joueur");
        }
        this._updateSetupView();
    }

    handleReset(){
        this.gameModel.reset();
        this.gameView.showInput();
        this.gameView.hideDisplayContainer();
        this._updateGameView();
    }

    handleReveal(){
        return this.gameModel.words;
    }

    handlePlayerDisplay(currentPlayer){
        //si la partie est en cours, on affiche à qui le tour
        if( this.gameModel.isGameCompleted() ){
            this.gameView.showFinishInfo();
        }else{
            this.gameView.displayPlayerName(currentPlayer);
        }
    }

}