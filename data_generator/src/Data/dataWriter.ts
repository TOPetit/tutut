import { writeFileSync } from "fs";
import { resolve } from "path";
import { Tile, Chart, BarChart, ChartType } from "../Components/components";

const standard_colors: { [key: string]: string } = {
    "Théo": "#dfe7fe",
    "Matthieu": "#e6f1e1",
    "Jodie": "#ffdede"
}

export class Writer {
    private participants: string[] = [];
    private color: { [key: string]: string } = {};
    private tiles: Tile[] = [];
    private charts: { bar: { [key: string]: BarChart } } = { bar: {} };
    public constructor(participants: string[]) {
        this.participants = participants;
        participants.forEach((user) => {
            this.color[user] = standard_colors[user] ? standard_colors[user] : this.color[user] = this.getRandomHexColor()
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

    public addChart(chart: Chart | Chart[]): void {
        if (chart instanceof Chart) {
            chart = [chart]
        }
        chart.forEach(element => {
            switch (element.type) {
                case ChartType.BAR:
                    this.charts.bar[element.name] = element as BarChart;
                    break;

                default:
                    break;
            }
        })
    }

    public json(): void {
        const jsonData: string = JSON.stringify(this);
        writeFileSync(resolve(__dirname, 'data.json'), jsonData, 'utf8');
    }
}