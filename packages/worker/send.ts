import amqp from 'amqplib/callback_api';

const queue = 'nodeless-functions';
const CONN_URL = 'amqp://localhost';

let ch = null;
function sleep(ms) {
   return new Promise(resolve => {
      setTimeout(resolve, ms)
   })
}

amqp.connect(CONN_URL, async (err, conn) => {
    if (err) throw err;

   conn.createChannel(async (err, channel) => {
    if (err) throw err;

    ch = channel;

    while(true) {
       const time = new Date().getTime();
       publishToQueue(queue, JSON.stringify({ functionId: "5df510cfd509136bb630fdcf" }));
       await sleep(4000);
    }
   });
});
export const publishToQueue = async (queueName, data) => {
  console.log(`${new Date().getTime()} - send to...`, data);
  ch.sendToQueue(queueName, new Buffer(data), { persistent: true });
};
process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});
