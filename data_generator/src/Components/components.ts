import { Data } from "../Data/dataConverter";

export type Values = { [key: string]: string | number };
export type SortedValues = { user: string, value: string }[];

export class Tile {
    public name: string;
    public values: SortedValues;
    public constructor(name: string, compute: (data: Data) => Values, sort: (values: Values) => SortedValues, data: Data) {
        this.name = name;
        this.values = sort(compute(data));
    }
}

export enum ChartType { NULL, BAR, PIE, LINE };
export type BarChartData = { user: string; data: number[] }[];

export class Chart {
    public type: ChartType = ChartType.NULL;
    public name: string;
    public constructor(name: string) {
        this.name = name;
    }
}

export class BarChart extends Chart {
    public type: ChartType = ChartType.BAR;
    public data: { data: BarChartData, labels: string[] };;
    public constructor(type: ChartType, name: string, compute: (data: Data) => { data: BarChartData, labels: string[] }, data: Data) {
        super(name)
        this.type = type;
        this.data = compute(data);
    }
}
