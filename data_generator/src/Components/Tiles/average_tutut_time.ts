import { data, Data } from "../../Data/dataConverter";
import { Tile, Values } from "../components";

function compute(data: Data) {
    let values: Values = {};
    let number_of_tutut: Values = {};
    let accumulator: Values = {};
    data.participants.forEach(element => {
        values[element] = '';
        number_of_tutut[element] = 0;
        accumulator[element] = 0;
    })
    data.messages.forEach(element => {
        if (element.isCorrectTutut()) {
            const date = new Date(element.timestamp);
            date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
            number_of_tutut[element.sender] = (number_of_tutut[element.sender] as number) + 1;
            accumulator[element.sender] = (accumulator[element.sender] as number) + date.getMinutes() + date.getMilliseconds() / 1000;
        }
    })
    data.participants.forEach(element => {
        values[element] = Number(accumulator[element]) / Number(number_of_tutut[element]);
        values[element] = String(Number(values[element]).toFixed(3)) + 's';
    })
    return values;
}

export const average_tutut_time = new Tile('Tutut le plus rapide', compute, data)
