import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import jszip from 'jszip';

const fct = async () => {
    const fileContent = readFileSync('downloads/facebook-theopetit1848.zip');
    const jszipInstance = new jszip();
    const result = await jszipInstance.loadAsync(fileContent);
    const keys = Object.keys(result.files);
    for (let key of keys) {
        const item = result.files[key];
        item.name = 'downloads/' + item.name;
        if (item.dir) {
            mkdirSync(item.name);
        }
        else {
            writeFileSync(item.name, Buffer.from(await item.async('arraybuffer')));
        }
    }
}

fct();
