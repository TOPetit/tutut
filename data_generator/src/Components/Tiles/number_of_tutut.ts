import { Tile, TileResutls } from '../components';
import { Data } from '../../Data/dataConverter';

export class Number_Of_Tutut implements Tile {
    name = "Nombre de tutut";
    results: TileResutls = {};
    /**
    * 
    * @param data 
    */
    public calculate(data: Data[]): void {
        data.forEach( (line) => {
            if (line.user in this.results) {
                this.results[line.user] += 1;
            }
            else {
                this.results[line.user] = 0;
            }
        })
    }
    public constructor(data?: Data[]) {
        if (data) {
            this.calculate(data);
        }
    }
}
