import { readFileSync } from "fs";

type ObjReaction = { emoji: string, sender: string };
type ObjMessage = { sender: string, timestamp: number, content: string, reactions: ObjReaction[] };
type ObjData = { participants: string[], messages: ObjMessage[] }

class Reaction {
    public emoji: string;
    public sender: string;
    public constructor(obj: ObjReaction) {
        this.emoji = obj.emoji;
        this.sender = obj.sender;
    }
}

class Message {
    public sender: string;
    public timestamp: number;
    public content: string;
    public reactions: Reaction[];
    public constructor(obj: ObjMessage) {
        this.sender = obj.sender;
        this.timestamp = obj.timestamp;
        this.content = obj.content;
        this.reactions = [];
        obj.reactions.forEach(element => {
            this.reactions.push(new Reaction(element));
        });
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

export function convertData(path: string): Data {
    const fileContent = readFileSync(path, 'latin1');
    const content = JSON.parse(fileContent);
    decodeObject(content);
    return new Data(content);
}
