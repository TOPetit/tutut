import { data, Data } from "../../Data/dataConverter";
import { date_to_string } from "../../Utils/time";
import { SortedValues, Tile, Values } from "../components";

function compute(data: Data) {
    let values: Values = {};
    let comparator: Values = {};
    data.participants.forEach(element => {
        values[element] = '';
        comparator[element] = 60_000;
    })
    data.messages.forEach(element => {
        const date = new Date(element.timestamp);
        date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
        if (element.isCorrectTutut() && comparator[element.sender] > date.getMilliseconds() + 1000 * date.getSeconds()) {
            // We have found a faster tutut that what we previoulsy had
            comparator[element.sender] = date.getMilliseconds() + 1000 * date.getSeconds();
            values[element.sender] = date_to_string(date);
        }
    })
    return values;
}

function sort(values: Values): SortedValues {
    let tmp_array: SortedValues = [];
    Object.keys(values).forEach(element => {
        tmp_array.push({ user: element, value: String(values[element]) })
    })
    tmp_array.sort((a, b) => { return (Number(a.value.slice(-6)) - Number(b.value.slice(-6))) });
    return tmp_array;
}

export const fastest_tutut = new Tile('Tutut le plus rapide', compute, sort, data)
