import { writeFileSync } from "fs";
import { resolve } from "path";
import { Tile } from "../Components/components";

export class Writer {
    private participants: string[] = [];
    private color: { [key: string]: string } = {};
    private tiles: Tile[] = [];
    public constructor(participants: string[]) {
        this.participants = participants;
        participants.forEach((user) => {
            this.color[user] = this.getRandomHexColor()
        })
    }

    private getRandomHexColor(): string {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
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