
import Imap from 'imap';
import simpleParser from 'mailparser';


const imap = new Imap({
    user: process.env.GMAIL_USER,
    password: process.env.GMAIL_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
});

function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}

// search for emails that meet the specified criteria
imap.once('ready', function () {
    openInbox(function (err, box) {
        if (err) throw err;
        const query = ['FROM', 'theo.p83@gmail.com'];
        imap.search(query, function (err, results) {
            if (err) throw err;
            const messageIndex = results[0];
            const f = imap.fetch(messageIndex, { bodies: '' });
            f.on('message', function (msg, seqno) {
                const messageParts = [];
                msg.on('body', function (stream, info) {
                    let buffer = '';
                    stream.on('data', function (chunk) {
                        buffer += chunk.toString('utf8');
                    });
                    stream.once('end', function () {
                        messageParts.push(buffer);
                    });
                });
                msg.once('end', async function () {
                    const messageBody = messageParts.join('');
                    const parsedMessage = await simpleParser(messageBody);
                    const attachments = parsedMessage.attachments;
                    for (const attachment of attachments) {
                        // save the attachment to a file or perform other actions on it
                        console.log(`Attachment ${attachment.filename} saved.`);
                    }
                });
            });
            f.once('error', function (err) {
                console.log('Fetch error: ' + err);
            });
            f.once('end', function () {
                imap.end();
            });
        });
    });
});

imap.once('error', function (err) {
    console.log(err);
});

imap.once('end', function () {
    console.log('Connection ended');
});

imap.connect();
