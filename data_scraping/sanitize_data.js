import { readFileSync, writeFileSync } from 'fs';

var sanitized_data = {
    participants: [],
    messages: []
};

const fct = async () => {
    const fileContent = readFileSync('downloads/messages/inbox/safespacevoyageaucentredelaterre_4567795139935838/message_1.json', 'latin1');
    const content = JSON.parse(fileContent);
    decodeObject(content);

    const layout = `
    1234567890
    azertyuiop
    qsdfghjklm
    wxcvbn,.-
    `;

    const keyboard = generateKeyboard(layout);

    // Get participants
    content.participants.forEach(participant => {
        sanitized_data.participants.push(participant.name.split(' ')[0])
    });

    // Get messages
    content.messages.forEach(message => {
        // If the message contains text (ie not a gif or an image)
        if (message.content) {
            if (filterMessage(message.content, keyboard)) {
                const cured_message = {
                    sender: message.sender_name.split(' ')[0],
                    timestamp: message.timestamp_ms,
                    content: message.content,
                    reactions: []
                };
                if (message.reactions) {
                    message.reactions.forEach(reaction => {
                        const cured_reaction = {
                            emoji: reaction.reaction,
                            sender: reaction.actor.split(' ')[0]
                        }
                        reaction.actor.split(' ')[0];
                        cured_message.reactions.push(cured_reaction)
                    })
                }
                sanitized_data.messages.push(cured_message);
            }
        }
    })
    const jsonData = JSON.stringify(sanitized_data);

    writeFileSync('downloads/output.json', jsonData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
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

function filterMessage(content, keyboard) {
    if (content == '💙') {return true}
    const cured_content = content.toLowerCase();
    const dist = damerauLevenshteinDistance('tutut', cured_content, keyboard);
    return (dist < 3);
}

function damerauLevenshteinDistance(a, b, keyboard) {
    // Initialize the matrix for storing the distances
    const distanceMatrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));

    // Set up the base cases for the distance matrix
    for (let i = 0; i <= a.length; i += 1) {
        distanceMatrix[i][0] = i;
    }
    for (let j = 0; j <= b.length; j += 1) {
        distanceMatrix[0][j] = j;
    }

    // Iterate through the matrix and fill in the rest of the values
    for (let i = 1; i <= a.length; i += 1) {
        for (let j = 1; j <= b.length; j += 1) {
            let cost = a[i - 1] === b[j - 1] ? 0 : (keyboard[a[i - 1]] && keyboard[a[i - 1]][b[j - 1]]) || 1;
            distanceMatrix[i][j] = Math.min(
                distanceMatrix[i - 1][j] + 1, // deletion
                distanceMatrix[i][j - 1] + 1, // insertion
                distanceMatrix[i - 1][j - 1] + cost, // substitution
            );
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                distanceMatrix[i][j] = Math.min(
                    distanceMatrix[i][j],
                    distanceMatrix[i - 2][j - 2] + cost, // transposition
                );
            }
        }
    }

    // Return the distance between the two strings
    return distanceMatrix[a.length][b.length];
}


function generateKeyboard(layout) {
    // Split the layout into rows
    const rows = layout.split('\n');

    // Create the keyboard object
    const keyboard = {};
    for (let i = 0; i < rows.length; i += 1) {
        for (let j = 0; j < rows[i].length; j += 1) {
            const char = rows[i][j];
            keyboard[char] = {};
            // Add the keyboard distances for the characters in the same row
            for (let k = 0; k < rows[i].length; k += 1) {
                if (k !== j) {
                    keyboard[char][rows[i][k]] = Math.abs(j - k);
                }
            }
            // Add the keyboard distances for the characters in the same column
            for (let k = 0; k < rows.length; k += 1) {
                if (k !== i) {
                    keyboard[char][rows[k][j]] = Math.abs(i - k);
                }
            }
        }
    }

    return keyboard;
}

fct()
