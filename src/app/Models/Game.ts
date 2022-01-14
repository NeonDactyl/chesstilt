import { Accuracies } from "./Accuracies";
import { Player } from "./Player";

export class Game
{
    "accuracies": Accuracies;
    "black": Player;
    "end_time": number;
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
}