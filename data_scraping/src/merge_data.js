import { parseJSON, writeJSON, isMessageEqual, compareMessage } from './utils.js';

const new_content = parseJSON('downloads/output.json');
const new_messages = new_content.messages;

const old_content = parseJSON('src/data/data.json');

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

writeJSON(old_content, 'src/data/data.json');
