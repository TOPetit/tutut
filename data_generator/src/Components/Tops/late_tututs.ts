import { data, Data, Message } from "../../Data/dataConverter";
import { Top } from "./Top";

function compareMessage(message1: Message, message2: Message): number {
    return message1.getSecMilli() - message2.getSecMilli();
}

function late_tututs(data: Data, nb: number): Message[] {
    let result: Message[] = [];
    data.messages.forEach(message => {
        if (message.isCorrectTutut()) {
            if (result.length < nb) {
                result.push(message);
            }
            else {
                if (message.getSecMilli() > result[0].getSecMilli()) {
                    result[0] = message;
                }
            }
            result.sort(compareMessage);
        }
    })
    return result
}

export let top_late_tututs = new Top("10 slowest tututs", late_tututs(data, 10));
