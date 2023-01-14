import { Message } from "../../Data/dataConverter";

export class Top {
    public name: string = 'Undefined top name';
    public data: Message[] = [];
    constructor(name: string, data: Message[]) {
        this.name = name;
        this.data = data;
    }
}