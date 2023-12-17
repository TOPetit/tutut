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

    // Get email date filter (1 week ago)
    const today = new Date();
    const nextWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = nextWeek.toLocaleDateString('en-US', options);
    logger.info(`Looking for emails since ${formattedDate}.`);

    const imap = new MyImap(config);
    const result = await imap.connect();
    logger.info(`result: ${result}`);
    const boxName = await imap.openBox();
    logger.info(`boxName: ${boxName}`);

    const criteria = [['FROM', 'theo.p83@gmail.com'], ['SINCE', formattedDate]];

    let emails = await imap.fetchEmails(criteria);

    emails.sort((a, b) => b.date - a.date);

    const email = emails[0]
    if (email === undefined) {
        throw new Error("No email found matching the criteria.");
    }

    logger.info(`Found an email from ${email.date}.`);
    new_date = `${email.date}`
    if (get_version() == new_date) {
        logger.info(`Email found is not more recent that what has been processed already.`);
        logger.info(`Date of last version : ${get_version()}`);
        exit(1)
    }
    else {
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
        set_version(new_date);
    }
    await imap.end();
}

run(argv.subject).then(() => {
    process.exit();
}).catch((error) => {
    logger.error(error);
    process.exit(1);
});
