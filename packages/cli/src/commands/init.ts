import fs from 'fs';
import cliProgress from 'cli-progress';
import gitDownloader from 'download-git-repo';

import exec from '../exec';
import { CLONE_PATH, CURRENT_DIR } from '../constants';
import { createDirectoryContents } from '../helper';

export async function init(funcName) {
    const progess = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progess.start(100, 0);
    try {
        const templatePath = `${CLONE_PATH}/templates/func/typescript`;
        await new Promise((resolve, reject) =>
            gitDownloader('github:Abrax20/nodeless', CLONE_PATH, {}, err => (err ? reject(err) : resolve())),
        );
        progess.update(20);
        fs.mkdirSync(`${CURRENT_DIR}/${funcName}`);
        progess.update(40);
        createDirectoryContents(templatePath, funcName);
        progess.update(60);
        await exec(`cd ${funcName} && npm i`);
        progess.update(80);
        await exec(`rm -fr ${CLONE_PATH}`);
        progess.update(100);
        progess.stop();
    } catch (err) {
        progess.stop();
        console.error(err);
    }
}
