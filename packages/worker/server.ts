import amqp from 'amqplib';
import { NodeVM } from 'vm2';
import { createMongoDBConnection, Func, isObjectId } from '@nodeless/util';

const CONN_URL = 'amqp://localhost';
const queue = 'nodeless-functions';

const functions = {};
function parseQueueMessage(data: Buffer): { functionId: string; params: any } {
  const { functionId, params } = JSON.parse(data.toString());

  if (!functionId || !isObjectId(functionId)) {
    throw new Error('functionId is not a ObjectId');
  }

  return { functionId, params: params || {} };
}

(async (): Promise<void> => {
  try {
    await createMongoDBConnection('mongodb://localhost/nodeless');
    const conn = await amqp.connect(CONN_URL);
    const channel = await conn.createChannel();
    channel.prefetch(1);

    await channel.assertQueue(queue, { durable: false });
    channel.consume(queue, async msg => {
      try {
        const { functionId: _id, params } = parseQueueMessage(msg.content);
        if (!functions[_id]) {
          functions[_id] = await Func.findOne({ _id });
        }
        const func = functions[_id];
        const vm = new NodeVM({
          console: 'inherit',
          sandbox: {},
        });

        const { default: worker } = vm.run(func.code);

        const result = worker(params);
        const data = JSON.stringify(result) || '';
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(data), { correlationId: msg.properties.correlationId });
      } catch (err) {
        console.error(err);
      }

      await channel.ack(msg);
    });
  } catch (err) {
    console.error(err);
  }
})();
