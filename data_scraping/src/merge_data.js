const fs = require('fs')

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
    const fileContent = fs.readFileSync(path, 'latin1');
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

    fs.writeFileSync(path, jsonData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
    })
}

function compareMessage(message1, message2) {
    return message1.timestamp - message2.timestamp;
}

const new_content = parseJSON('downloads/output.json');
const new_messages = new_content.messages;

const old_content = parseJSON('src/data/data.json');

new_messages.forEach(new_message => {
    if (old_content.messages.filter(old_message => isMessageEqual(new_message, old_message)).length == 0) {
        old_content.messages.push(new_message);
    }
});

old_content.messages.sort(compareMessage)

writeJSON(old_content, 'src/data/data.json');
