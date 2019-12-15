import fs from 'fs';
import exec from '../exec';
import cliProgress from 'cli-progress';
import { CURRENT_DIR } from '../constants';
import { createMongoDBConnection, Func } from '@nodeless/util';

export async function deploy() {
  const progess = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progess.start(100, 0);
  try {
    await createMongoDBConnection('mongodb://localhost/nodeless');
    progess.update(10);
    const pjson = require(`${CURRENT_DIR}/package.json`);
    const name = pjson.name;
    let code = '';
    progess.update(40);
    await exec(`yarn build`);
    progess.update(60);
    code = fs.readFileSync('./dist/main.js', 'utf8');
    progess.update(80);
    await Func.create({ title: name, code: code });
    progess.update(100);
    progess.stop();
  } catch (err) {
    progess.stop();
    console.error(err);
  }
}
