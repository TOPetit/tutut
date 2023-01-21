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

export class Message {
    public sender: string;
    public timestamp: number;
    public content: string;
    public reactions: Reaction[];
    public date: Moment;
    public formattedDate: string;

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
        if (this.content.toLowerCase() != 'tutut') {
            return false; // This is not a tutut.
        }
        return (this.date.hour() == this.date.minute());
    }

    public getSecMilli(): number {
        return this.date.millisecond() / 1000 + this.date.second()
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

export const data = convertData();
