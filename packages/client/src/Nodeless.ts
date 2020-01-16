import amqp from 'amqplib';
import { EventEmitter } from 'events';
import { NodelessSettings, NodelessSettingsType } from './NodelessSettings';
import { compareCorrelationIdInMessage, generateUUID, getFunctionAction } from './helper';

const ON_MESSAGE_EVENT = 'ON_MESSAGE';

export class Nodeless {
  private channel: any;
  private connection: any;
  private privateQueue: any;
  private static nodeless: Nodeless;
  private settings: NodelessSettings;
  private events = new EventEmitter();

  private constructor(connectionURL: string, options: NodelessSettingsType = {}) {
    this.settings = new NodelessSettings({ connectionURL, ...options });
  }

  public static async init(connectionURL: string, options: NodelessSettingsType = {}): Promise<Nodeless> {
    if (this.nodeless) return this.nodeless;
    this.nodeless = new Nodeless(connectionURL, options);
    await this.nodeless.connect();
    return this.nodeless;
  }

  public async connect(): Promise<void> {
    this.connection = await amqp.connect(this.settings.getConnectionURL());
    this.channel = await this.connection.createChannel();
    this.privateQueue = await this.channel.assertQueue('', { exclusive: true });
    this.channel.consume(this.privateQueue.queue, msg => this.events.emit(ON_MESSAGE_EVENT, msg), {
      noAck: true,
    });
  }

  public getReplyOptions(correlationId: string): { correlationId: string; replyTo: any } {
    return { correlationId, replyTo: this.privateQueue.queue };
  }

  public call(functionId: string, params: any = {}): Promise<any> {
    return new Promise<any>(resolve => {
      const correlationId = generateUUID();
      this.putJob(functionId, params, this.getReplyOptions(correlationId));

      const handler = message => {
        if (compareCorrelationIdInMessage(correlationId, message)) {
          resolve(message.content.toString());
          this.events.removeListener(ON_MESSAGE_EVENT, handler);
        }
      };
      this.events.on(ON_MESSAGE_EVENT, handler);
    });
  }

  public async callWithoutReturnValue(functionId: string, params: any): Promise<void> {
    await this.putJob(functionId, params);
  }

  public putJob(functionId: string, params: any, options = {}): Promise<any> {
    return this.channel.sendToQueue(
      this.settings.getFunctionQueue(),
      Buffer.from(JSON.stringify(getFunctionAction(functionId, params))),
      { persistent: true, ...options },
    );
  }
}
