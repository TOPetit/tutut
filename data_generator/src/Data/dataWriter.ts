import { writeFileSync } from "fs";
import { resolve } from "path";
import { Tile, Chart, BarChart, ChartType } from "../Components/components";
import { Top } from "../Components/Tops/Top";

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
    private tops: Top[] = [];
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
        let temp: Tile[] = tile instanceof Tile ? [tile] : tile;
        temp.forEach(element => {
            this.tiles.push(element);
        })
    }

    public addChart(chart: Chart | Chart[]): void {
        let temp: Chart[] = chart instanceof Chart ? [chart] : chart;
        temp.forEach(element => {
            switch (element.type) {
                case ChartType.BAR:
                    this.charts.bar[element.name] = element as BarChart;
                    break;

                default:
                    break;
            }
        })
    }

    public addTop(top: Top | Top[]): void {
        let temp: Top[] = top instanceof Top ? [top] : top;
        temp.forEach(element => {
            this.tops.push(element);
        })
    }

    public json(): void {
        const jsonData: string = JSON.stringify(this);
        writeFileSync(resolve(__dirname, 'data.json'), jsonData, 'utf8');
    }
}