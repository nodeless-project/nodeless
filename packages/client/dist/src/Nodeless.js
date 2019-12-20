"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const events_1 = require("events");
const NodelessSettings_1 = require("./NodelessSettings");
const helper_1 = require("./helper");
const ON_MESSAGE_EVENT = 'ON_MESSAGE';
class Nodeless {
    constructor(connectionURL, options = {}) {
        this.events = new events_1.EventEmitter();
        this.settings = new NodelessSettings_1.NodelessSettings(Object.assign({ connectionURL }, options));
    }
    static init(connectionURL, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const nodeless = new Nodeless(connectionURL, options);
            yield nodeless.connect();
            return nodeless;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield amqplib_1.default.connect(this.settings.getConnectionURL());
            this.channel = yield this.connection.createChannel();
            this.privateQueue = yield this.channel.assertQueue('', { exclusive: true });
            this.channel.consume(this.privateQueue.queue, msg => this.events.emit(ON_MESSAGE_EVENT, msg), {
                noAck: true,
            });
        });
    }
    getReplyOptions(correlationId) {
        return { correlationId, replyTo: this.privateQueue.queue };
    }
    call(functionId, params) {
        return new Promise(resolve => {
            const correlationId = helper_1.generateUUID();
            this.putJob(functionId, params, this.getReplyOptions(correlationId));
            const handler = message => {
                if (helper_1.compareCorrelationIdInMessage(correlationId, message)) {
                    resolve(message.content.toString());
                    this.events.removeListener(ON_MESSAGE_EVENT, handler);
                }
            };
            this.events.on(ON_MESSAGE_EVENT, handler);
        });
    }
    callWithoutReturnValue(functionId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.putJob(functionId, params);
        });
    }
    putJob(functionId, params, options = {}) {
        return this.channel.sendToQueue(this.settings.getFunctionQueue(), Buffer.from(JSON.stringify(helper_1.getFunctionAction(functionId, params))), Object.assign({ persistent: true }, options));
    }
}
exports.Nodeless = Nodeless;
//# sourceMappingURL=Nodeless.js.map