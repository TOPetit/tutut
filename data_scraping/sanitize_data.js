const fs = require('fs');

var sanitized_data = {
    participants: [],
    messages: []
};

const fct = async () => {
    const fileContent = fs.readFileSync('downloads/messages/inbox/safespacevoyageaucentredelaterre_4567795139935838/message_1.json', 'latin1');
    const content = JSON.parse(fileContent);
    decodeObject(content);

    // Get participants
    content.participants.forEach(participant => {
        sanitized_data.participants.push(participant.name.split(' ')[0])
    });

    // Get messages
    content.messages.forEach(message => {
        // If the message contains text (ie not a gif or an image)
        if (message.content) {
            if (filterMessage(message.content)) {
                const cured_message = {
                    sender: message.sender_name.split(' ')[0],
                    timestamp: message.timestamp_ms,
                    content: message.content,
                    reactions: []
                };
                message.reactions.forEach(reaction => {
                    const cured_reaction = {
                        emoji: reaction.reaction,
                        sender: reaction.actor.split(' ')[0]
                    }
                    reaction.actor.split(' ')[0];
                    cured_message.reactions.push(cured_reaction)
                })
                sanitized_data.messages.push(cured_message);
            }
        }
    })

}

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

function filterMessage(content) {
    const cured_content = content.toLowerCase();
    return (cured_content == 'tutut');
}

fct()
console.log(sanitized_data)
