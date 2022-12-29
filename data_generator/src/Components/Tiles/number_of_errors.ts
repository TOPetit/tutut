import { data, Data } from "../../Data/dataConverter";
import { Tile, Values } from "../components";

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

export const number_of_errors = new Tile('Nombre de Tutut', compute, data)
