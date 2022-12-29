import { Data } from "../Data/dataConverter";

export type Values = { [key: string]: string | number };
export type SortedValues = { user: string, value: string }[];

export class Tile {
    private name: string;
    private values: SortedValues;
    public constructor(name: string, compute: (data: Data) => Values, sort: (values: Values) => SortedValues, data: Data) {
        this.name = name;
        this.values = sort(compute(data));
    }
}
