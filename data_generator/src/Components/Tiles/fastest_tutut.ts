import { data, Data } from "../../Data/dataConverter";
import { date_to_string } from "../../Utils/time";
import { Tile, Values } from "../components";

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

export const fastest_tutut = new Tile('Tutut le plus rapide', compute, data)
