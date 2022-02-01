import { GameCollection } from "./GameCollection";

export class PlayerGameSet
{
    all: GameCollection = new GameCollection();
    bullet: GameCollection = new GameCollection();
    blitz: GameCollection = new GameCollection();
    rapid: GameCollection = new GameCollection();
    daily: GameCollection = new GameCollection();
}