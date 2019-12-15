import amqp from 'amqplib/callback_api';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const queue = 'nodeless-functions';
const CONN_URL = 'amqp://localhost';

let ch = null;
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

amqp.connect(CONN_URL, async (err, conn) => {
    if (err) throw err;

    conn.createChannel(function(err, channel) {
        if (err) {
            throw err;
        }

        ch = channel;

        channel.assertQueue('', { exclusive: true }, async function(err, q) {
            if (err) {
                throw err;
            }

            const correlationId = generateUUID();
            channel.consume(q.queue, function(msg) {
                if (msg.properties.correlationId == correlationId) {
                    console.log('Response', msg.content.toString());
                }
            }, {
                noAck: true
            });


            while (true) {
                publishToQueue(queue, { functionId: '5df510cfd509136bb630fdcf' }, { correlationId: correlationId, replyTo: q.queue });
                await sleep(4000);
            }
        });
    });
});

process.on('exit', code => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});

export const publishToQueue = async (queueName, data, options) => {
    ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true, ...options });
};
