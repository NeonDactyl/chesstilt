import { Accuracies } from "./Accuracies";
import { GameResponse } from "./GameResponse";
import { Player } from "./Player";

export class Game
{
    "accuracies": Accuracies;
    "black": Player;
    "end_time": Date;
    "fen": string;
    "initial_setup": string;
    "pgn": string;
    "rated": boolean;
    "rules": string;
    "tcn": string;
    "time_class": string;
    "time_control": string;
    "url": string;
    "uuid": string;
    "white": Player;

    /**
     *
     */
    constructor(game: GameResponse) {
        this.accuracies = game.accuracies;
        this.black = game.black;
        this.end_time = new Date(game.end_time * 1000);
        this.fen = game.fen;
        this.initial_setup = game.initial_setup;
        this.pgn = game.pgn;
        this.rated = game.rated;
        this.rules = game.rules;
        this.tcn = game.tcn;
        this.time_class = game.time_class;
        this.time_control = game.time_control;
        this.url = game.url;
        this.uuid = game.uuid;
        this.white = game.white;
    }
}