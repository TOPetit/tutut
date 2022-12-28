import { resolve } from "path";

import { Data, convertData } from './Data/dataConverter';

const data_path: string = resolve(__dirname, '../../data_scraping/src/data/data.json');

var data: Data = convertData(data_path);
console.log(data.messages);
