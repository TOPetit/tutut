import { data, Data } from "../../Data/dataConverter";
import { SortedValues, Tile, Values } from "../components";

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
        if (element.isCorrectTutut() && element.source != "whatsapp") {
            const date = new Date(element.timestamp);
            date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
            number_of_tutut[element.sender] = (number_of_tutut[element.sender] as number) + 1;
            accumulator[element.sender] = (accumulator[element.sender] as number) + date.getMinutes() + date.getMilliseconds() / 1000;
        }
    })
    data.participants.forEach(element => {
        values[element] = Number(accumulator[element]) / Number(number_of_tutut[element]);
        values[element] = Number(values[element]).toFixed(3);
    })
    return values;
}

function sort(values: Values): SortedValues {
    let tmp_array: SortedValues = [];
    Object.keys(values).forEach(element => {
        tmp_array.push({ user: element, value: String(values[element]) })
    })
    tmp_array.sort((a, b) => { return (Number(a.value) - Number(b.value)) });
    tmp_array.map(element => element.value += 's');
    return tmp_array;
}

export const average_tutut_time = new Tile('Temps de Tutut moyen', compute, sort, data)
