import cliProgress from 'cli-progress';
import { createMongoDBConnection, Func } from '@nodeless/util';

export async function rm(name: string) {
  const progess = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progess.start(100, 0);
  try {
    await createMongoDBConnection('mongodb://localhost/nodeless');
    progess.update(50);
    await Func.deleteOne({ title: name });
    progess.update(100);
    progess.stop();
  } catch (err) {
    progess.stop();
    console.error(err);
  }
}
