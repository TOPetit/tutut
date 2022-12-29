import { data, Data } from "../../Data/dataConverter";
import { SortedValues, Tile, Values } from "../components";

function compute(data: Data) {
    let values: Values = {};
    data.participants.forEach(element => {
        values[element] = 0;
    })
    data.messages.forEach(element => {
        if (element.content != '💙' && !element.isCorrectTutut()) {
            values[element.sender] = (values[element.sender] as number) + 1;
        }
    })
    return values;
}

function sort(values: Values): SortedValues {
    let tmp_array: SortedValues = [];
    Object.keys(values).forEach(element => {
        tmp_array.push({ user: element, value: String(values[element]) })
    })
    tmp_array.sort((a, b) => { return (Number(a.value) - Number(b.value)) });
    return tmp_array;
}

export const number_of_errors = new Tile("Nombre d'erreur", compute, sort, data)
