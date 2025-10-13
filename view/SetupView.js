 import { CONFIG } from "../config/constants.js";
import { GameController } from "../controller/GameController.js";
 import { Word } from "./components/Word.js";

 export class SetupView{
    constructor(){
        this.setupContainer = document.querySelector('.setupContainer');
        this.gameContainer = document.querySelector('.gameContainer');
        this.playerInput = document.querySelector('.playerInput');
        this.addPlayer = document.querySelector('.addPlayer');

        this.onHandleAddPlayer = null;
        this.players = [];
        this.unusedColors = [...CONFIG.colors];
        this.usedColors = [];
        this._bindEvents();

    }
 
    _bindEvents(){
        this.addPlayer.addEventListener('click', () => this.handleAddPlayer());
        this.playerInput.addEventListener('keydown', (e) => {
            if(e.key === 'Enter'){
                e.preventDefault();
                this.handleAddPlayer();
            }
        })
    }

    show(){
        this.setupContainer.style.display = 'block';
        this.gameContainer.style.display = 'none';
    }

    hide(){
        this.setupContainer.style.display = 'none';
        this.gameContainer.style.display = 'block';
        this.playerList = [];
    }

    renderPlayers(players){
        const ul = document.getElementById('playerList');
        ul.innerHTML = '';

        players.forEach(player => {
            const li = document.createElement('li');
            li.textContent = player.username;
            li.classList.add('playerLi');
            li.style.background = player.color;
            ul.append(li);
        });

    }


    onStartGame(callback){
        const startBtn = document.querySelector('.startGame');
        startBtn.addEventListener('click', ()=> {
            const config = this.getConfiguration();
            callback(config);
        });
    }

    handleAddPlayer(){
        const playerName = this.playerInput.value.trim();
        if(!playerName || playerName == ''){
            return
        }

        const player = this.assignColor(playerName)
        if(!player){
            return
        }

        this.players.push(player);
        this.renderPlayers(this.players);
        this.playerInput.value = '';

        if(this.unusedColors.length == 0){
            this.playerInput.disabled = true;
            this.addPlayer.disabled = true;
        }
    }

    assignColor(playerName){

        if(this.unusedColors.length == 0){
            alert("Nombre de joueurs maximum atteint")
            this.playerInput.value = '';
            return false;
        }

        const color = this.unusedColors.pop()

        const player = {
            username: playerName,
            color: color
        }

        this.usedColors.push(color);

        return player;
    }

    getConfiguration(){
        return {
            players: this.players,
            rounds: CONFIG.rounds
        }
    }

}
