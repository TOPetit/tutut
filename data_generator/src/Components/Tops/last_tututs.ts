import { data, Data, Message } from "../../Data/dataConverter";
import { Top } from "./Top";

function compareMessage(message1: Message, message2: Message): number {
    return message1.timestamp - message2.timestamp;
}

function last_tututs(data: Data, nb: number): Message[] {
    let result: Message[] = [];
    data.messages.forEach(message => {
        if (message.isCorrectTutut()) {
            if (result.length < nb) {
                result.push(message);
            }
            else {
                if (message.timestamp > result[0].timestamp) {
                    result[0] = message;
                }
            }
            result.sort(compareMessage);
        }
    })
    return result
}

export let top_last_tututs = new Top("Last 10 tututs", last_tututs(data, 10));
