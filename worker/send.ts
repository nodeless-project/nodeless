import amqp from 'amqplib/callback_api';

const CONN_URL = 'amqp://localhost';
let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    if (err) throw err;

   conn.createChannel(function (err, channel) {
    if (err) throw err;

    ch = channel;
    const time = new Date().getTime();
    console.log(time);
    publishToQueue('user-messages', JSON.stringify({ time }));
   });
});
export const publishToQueue = async (queueName, data) => {
   ch.sendToQueue(queueName, new Buffer(data), { persistent: true });
}
process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});
