import * as fs from "fs";
import * as path from "path";

export class Data {
    public user: string;
    public date: string;
    public content: string;

    public constructor(line: string) {
        [this.user, this.date, this.content] = line.split(';');
    }
} 


export function convertCSV(fileName: string) {

    let data: Data[] = [];

    const csvFilePath = path.resolve(__dirname, 'data.csv');
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    fileContent.split('\n').forEach( line => {
        if (line != '') {
            data.push(new Data(line));
        }
    })
    
    return data;
}
