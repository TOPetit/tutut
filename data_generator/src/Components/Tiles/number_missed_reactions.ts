import { data, Data, Reaction } from "../../Data/dataConverter";
import { SortedValues, Tile, Values } from "../components";

function compute(data: Data) {
    let values: Values = {};
    data.participants.forEach(element => {
        values[element] = 0;
    })
    data.messages.forEach(message => {
        if (message.isCorrectTutut() && message.source != "whatsapp") {
            // if (message.reactions.length != 2) console.log(message.reactions)
            data.participants.forEach(user => {
                if (user != message.sender && !message.containsReaction(new Reaction({ sender: user, emoji: '❤' }))) {
                    values[message.sender] = (values[message.sender] as number) + 1;

                }
            })
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

export const number_missed_reactions = new Tile("Nombre de réactions manquantes", compute, sort, data)
