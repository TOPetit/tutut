const jszip = require('jszip')
const fs = require('fs')

const fct = async () => {
    const fileContent = fs.readFileSync('downloads/facebook-theopetit1848.zip');
    const jszipInstance = new jszip();
    const result = await jszipInstance.loadAsync(fileContent);
    const keys = Object.keys(result.files);
    for (let key of keys) {
        const item = result.files[key];
        item.name = 'downloads/' + item.name;
        if (item.dir) {
            fs.mkdirSync(item.name, { recursive: true });
        }
        else {
            fs.writeFileSync(item.name, Buffer.from(await item.async('arraybuffer')));
        }
    }
}

fct();
