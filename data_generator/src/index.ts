import { Data, convertCSV } from './Data/dataConverter';
import { Number_Of_Tutut } from './Components/Tiles/number_of_tutut';


var data: Data[] = convertCSV('./Data/data.csv');
let number_of_tutut = new Number_Of_Tutut(data);
console.log(number_of_tutut.results)
