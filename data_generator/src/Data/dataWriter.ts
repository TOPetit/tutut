import { writeFileSync } from "fs";
import { resolve } from "path";
import { Tile } from "../Components/components";

export class Writer {
    private participants: string[] = [];
    private tiles: Tile[] = [];
    public constructor(participants: string[]) {
        this.participants = participants;
    }

    public addTile(tile: Tile | Tile[]): void {
        if (tile instanceof Tile) {
            tile = [tile];
        }
        tile.forEach(element => {
            this.tiles.push(element);
        })
    }

    public json(): void {
        const jsonData: string = JSON.stringify(this);
        writeFileSync(resolve(__dirname, 'data.json'), jsonData, 'utf8');
    }
}