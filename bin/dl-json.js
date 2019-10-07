'use strict';
const gsjson = require('google-spreadsheet-to-json');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const spreadsheetId = '1A-MSH0p3AEkLoBLRJFIEP6uzJwIJlr8MammeN0_t22U';

async function downloadData(worksheet, mapper) {
    const result = mapper(await gsjson({
        spreadsheetId,
        propertyMode: 'none',
        worksheet: worksheet,
    }));
    await writeFile(
        path.resolve(__dirname, `../json/${worksheet}.json`),
        JSON.stringify(result, null, 2)
    );
}

Promise.all([
    downloadData('enemies', e => e),
    downloadData('stages', stages => stages.map(stage => ({
        ...stage,
        enemies: stage.enemies.split('、'),
    })))
])
.catch(e => setImmediate(() => { throw e }));

