import amqp from 'amqplib/callback_api';

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
       publishToQueue('user-messages', JSON.stringify({ time }));
       publishToQueue('user-messages', JSON.stringify({ time: time+1 }));
       publishToQueue('user-messages', JSON.stringify({ time: time+2 }));
       publishToQueue('user-messages', JSON.stringify({ time: time+3 }));
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
