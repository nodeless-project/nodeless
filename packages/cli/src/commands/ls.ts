import { createMongoDBConnection, Func } from '@nodeless/util';

export async function ls() {
  try {
    await createMongoDBConnection('mongodb://localhost/nodeless');
    let funcs = await Func.find().select('title code');
    funcs = funcs.map(item => item.toObject());
    console.table(funcs, ['_id', 'title']);
  } catch (err) {
    console.error(err);
  }
}
