import { Data } from "../Data/dataConverter";

export type Values = { [key: string]: string | number };

export class Tile {
    private name: string = '';
    private values: Values = {};
    public constructor(name: string, compute: (data: Data) => Values, data: Data) {
        this.name = name;
        this.values = compute(data);
    }
}
