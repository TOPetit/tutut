import { parseJSON, writeJSON, isMessageEqual } from './utils.js';

const new_content = parseJSON('downloads/output.json');
const new_messages = new_content.messages;

const old_content = parseJSON('src/data/data.json');

new_messages.forEach(new_message => {
    if (old_content.messages.filter(old_message => isMessageEqual(new_message, old_message)).length == 0) {
        old_content.messages.push(new_message);
    }
});

writeJSON(old_content, 'src/data/data.json');
