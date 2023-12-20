import { z } from 'zod'
import { downloadCreation } from './download-creation';

const FILEPATH = "./archives/mifts.json"

const mifts = await Bun.file(FILEPATH).json();

for (let i = 0; i < mifts.length; i++) {
    const mift = mifts[i];
    console.log(i, mifts.length, mift.creationId)
    await downloadCreation(mift.creationId)
}
