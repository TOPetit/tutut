import { readFileSync } from "fs";
import { resolve } from "path";
import moment, { Moment } from 'moment-timezone';

type ObjReaction = { emoji: string, sender: string };
type ObjMessage = { sender: string, timestamp: number, content: string, reactions: ObjReaction[] };
type ObjData = { participants: string[], messages: ObjMessage[] }

export class Reaction {
    public emoji: string;
    public sender: string;
    public constructor(obj: ObjReaction) {
        this.emoji = obj.emoji;
        this.sender = obj.sender;
    }
}

export enum MessageType {
    UNDEFINED,
    CORRECT,
    ERROR,
    BLUE_HEART,
    DUPLICATE
}

export class Message {
    public sender: string;
    public timestamp: number;
    public content: string;
    public reactions: Reaction[];
    public date: Moment;
    public formattedDate: string;
    public type: MessageType = MessageType.UNDEFINED;

    public constructor(obj: ObjMessage) {
        this.sender = obj.sender;
        this.timestamp = obj.timestamp;
        this.content = obj.content;
        this.reactions = [];
        obj.reactions.forEach(element => {
            this.reactions.push(new Reaction(element));
        });
        this.date = moment(this.timestamp, 'x').tz("Europe/Paris");
        this.formattedDate = String(this.date.date()).padStart(2, '0') + '.' + String(this.date.month() + 1).padStart(2, '0') + '.' + String(this.date.year()).padStart(4, '0') + ' ' + String(this.date.hour()).padStart(2, '0') + ':' + String(this.date.minute()).padStart(2, '0') + ':' + String(this.date.second()).padStart(2, '0') + "." + String(this.date.millisecond()).padStart(3, '0');
    }

    /**
     * 
     * @returns {boolean} true if the Message is a correct tutut, false otherwise.
     */
    public isCorrectTutut(): boolean {
        if (this.type != MessageType.UNDEFINED) { return this.type == MessageType.CORRECT }
        if (this.content.toLowerCase() != 'tutut') {
            return false; // This is not a tutut.
        }
        return (this.date.hour() == this.date.minute());
    }

    /**
     * 
     * @returns a number representing seconds & milliseconds.
     */
    public getSecMilli(): number {
        return this.date.millisecond() / 1000 + this.date.second();
    }

    /**
     * 
     * @returns true if the message is a bleu heart, false otherwise.
     */
    public isBlueHeart(): boolean {
        if (this.type != MessageType.UNDEFINED) { return this.type == MessageType.BLUE_HEART }
        return this.content == '💙';
    }

    /**
     * 
     * @param reaction a Reaction object
     * @returns true if this reaction exists for that message, false otherwise.
     */
    public containsReaction(reaction: Reaction): boolean {
        let result: boolean = false;
        this.reactions.forEach(element => {
            if (reaction.sender == element.sender && reaction.emoji == element.emoji) { result = true }
        })
        return result;
    }
}

export class Data {
    public participants: string[];
    public messages: Message[];

    public constructor(obj: ObjData) {
        this.participants = obj.participants;
        this.messages = [];
        obj.messages.forEach(element => {
            this.messages.push(new Message(element));
        });
    }
}

function decode(s: string): string {
    let d = new TextDecoder();
    let a = s.split('').map((char) => char.charCodeAt(0));
    return d.decode(new Uint8Array(a));
}


function decodeObject(obj: any): void {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = decode(obj[key]);
        } else if (typeof obj[key] === 'object') {
            decodeObject(obj[key]);
        }
    }
}

function convertData(): Data {
    const path: string = resolve(__dirname, '../../../data_scraping/src/data/data.json');
    const fileContent = readFileSync(path, 'latin1');
    const content = JSON.parse(fileContent);
    decodeObject(content);
    return new Data(content);
}

function computeTypedData(): Data {
    let data: Data = convertData();
    data.messages.forEach((message, index) => {
        if (message.isBlueHeart()) { message.type = MessageType.BLUE_HEART; };
        if (!message.isCorrectTutut() && !message.isBlueHeart()) { message.type = MessageType.ERROR; };
        if (message.isCorrectTutut()) {
            let signature: string = message.date.format("DD:MM:YYYYTHH:MM");
            data.messages.slice(0, index).forEach(message2 => {
                if (message.sender == message2.sender && message2.type == MessageType.CORRECT && signature == message2.date.format("DD:MM:YYYYTHH:MM")) {
                    message.type = MessageType.DUPLICATE;
                }
            })
            if (message.type == MessageType.UNDEFINED) { message.type = MessageType.CORRECT; }
        }
        if (message.type == MessageType.UNDEFINED) { console.log("Could not resolve the type of this message :", message) }
    })
    return data;
}

export const data: Data = computeTypedData();
