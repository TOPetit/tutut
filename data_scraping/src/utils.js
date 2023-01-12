import { readFileSync, writeFileSync } from 'fs';

function decode(s) {
    let d = new TextDecoder;
    let a = s.split('').map(r => r.charCodeAt());
    return d.decode(new Uint8Array(a));
}

function decodeObject(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = decode(obj[key]);
        } else if (typeof obj[key] === 'object') {
            decodeObject(obj[key]);
        }
    }
}

export function parseJSON(path) {
    const fileContent = readFileSync(path, 'latin1');
    const content = JSON.parse(fileContent);
    decodeObject(content);
    return content;
}

export function isMessageEqual(message1, message2) {
    if (message1.timestamp != message2.timestamp) { return false };
    if (message1.sender != message2.sender) { return false };
    return true;
}


export function writeJSON(content, path) {
    const jsonData = JSON.stringify(content);

    writeFileSync(path, jsonData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
    })
}

export function compareMessage(message1, message2) {
    return message1.timestamp - message2.timestamp;
}
