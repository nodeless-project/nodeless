import util from 'util';
import { exec as Executer } from 'child_process';

export default util.promisify(Executer);
