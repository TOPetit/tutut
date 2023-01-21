import { data, Data, Message } from "../../Data/dataConverter";
import { Top } from "./Top";

function compareMessage(message1: Message, message2: Message): number {
    return message2.getSecMilli() - message1.getSecMilli();
}

function early_tututs(data: Data, nb: number): Message[] {
    let result: Message[] = [];
    data.messages.forEach(message => {
        if (message.isCorrectTutut()) {
            if (result.length < nb) {
                result.push(message);
            }
            else {
                if (message.getSecMilli() < result[0].getSecMilli()) {
                    result[0] = message;
                }
            }
            result.sort(compareMessage);
        }
    })
    return result.reverse();
}

export let top_early_tututs = new Top("Tôts", early_tututs(data, 10));
