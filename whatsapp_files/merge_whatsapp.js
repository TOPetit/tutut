const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

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

function parseJSON(path) {
    const fileContent = readFileSync(path, 'latin1');
    const content = JSON.parse(fileContent);
    decodeObject(content);
    return content;
}

function isMessageEqual(message1, message2) {
    if (message1.timestamp != message2.timestamp) { return false };
    if (message1.sender != message2.sender) { return false };
    return true;
}


function writeJSON(content, path) {
    const jsonData = JSON.stringify(content);

    writeFileSync(path, jsonData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
    })
}

function compareMessage(message1, message2) {
    return message1.timestamp - message2.timestamp;
}


const new_content = parseJSON('downloads/whatsapp_output.json');
const new_messages = new_content.messages;

const old_content = parseJSON(resolve(__dirname, '../data_scraping/src/data/data.json'));

new_messages.forEach(new_message => {
    let index = -1;
    for (let i = 0; i < old_content.messages.length; i++) {
        index = isMessageEqual(old_content.messages[i], new_message) ? i : index;
    }
    if (index == -1) {
        old_content.messages.push(new_message);
    }
    else {
        old_content.messages[index] = new_message;
    }
});

old_content.messages.sort(compareMessage)

writeJSON(old_content, resolve(__dirname, '../data_scraping/src/data/data.json'));
