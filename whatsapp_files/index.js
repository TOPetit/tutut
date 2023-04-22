require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));

const { resolve } = require('path');
const fs = require('fs');
const moment = require('moment');
const MyImap = require('./my-imap');
const logger = require('pino')({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: false,
            colorize: true,
            ignore: 'pid,hostname,time',
        },
    },
});

async function run(subject) {
    const config = {
        imap: {
            user: process.env.GMAIL_USER,
            password: process.env.GMAIL_PASS,
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
        },
        debug: logger.info.bind(logger),
    };

    const imap = new MyImap(config);
    const result = await imap.connect();
    logger.info(`result: ${result}`);
    const boxName = await imap.openBox();
    logger.info(`boxName: ${boxName}`);

    const criteria = [['FROM', 'theo.p83@gmail.com']];

    let emails = await imap.fetchEmails(criteria);

    emails.sort((a, b) => b.date - a.date);

    const email = emails[0]
    logger.info(`email: ${email.date}`);
    for (const file of email.files) {
        const lines = Buffer.from(file.buffer).toString().split('\n');
        fs.writeFileSync('downloads/raw_data.txt', lines.join('\n'), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return;
            }
        })
        logger.info(`filename: ${file.originalname}`);
    }
    logger.info(email.body.split('\n'), 'body:');

    await imap.end();
}

run(argv.subject).then(() => {
    process.exit();
}).catch((error) => {
    logger.error(error);
    process.exit(1);
});
