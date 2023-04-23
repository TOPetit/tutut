require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));

const fs = require('fs');
const MyImap = require('./my-imap');
const { exit } = require('process');
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

function get_version() {
    const version = fs.readFileSync('version', 'utf-8').split('\n')[0];
    return version
}

function set_version(version) {
    fs.writeFileSync('version', `${version}\n`, 'utf-8');
}

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
    logger.info(`Found an email from ${email.date}.`);
    new_date = `${email.date}`
    if (get_version() == new_date) {
        logger.info(`Email found is not more recent that what has been processed already.`);
        logger.info(`Date of last version : ${get_version()}`);
        exit(1)
    }
    else {
        set_version(new_date);
        for (const file of email.files) {
            const lines = Buffer.from(file.buffer).toString().split('\n');
            fs.writeFileSync('downloads/raw_data.txt', lines.join('\n'), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            })
            logger.info(`Saved file: ${file.originalname}`);
            logger.info(`With ${lines.length} lines.`)
        }
    }
    await imap.end();
}

run(argv.subject).then(() => {
    process.exit();
}).catch((error) => {
    logger.error(error);
    process.exit(1);
});
