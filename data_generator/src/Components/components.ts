import { Data } from '../Data/dataConverter'

export type TileResutls = {[key: string]: any}

export interface Tile {
    name: string;
    results: TileResutls;
    calculate(data: Data[]): void;
}
