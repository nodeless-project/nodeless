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
const vm2_1 = require("vm2");
const util_1 = require("@nodeless/util");
const CONN_URL = 'amqp://localhost';
const queue = 'nodeless-functions';
const functions = {};
function parseQueueMessage(data) {
    const { functionId, params } = JSON.parse(data.toString());
    if (!functionId || !util_1.isObjectId(functionId)) {
        throw new Error('functionId is not a ObjectId');
    }
    return { functionId, params: params || {} };
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield util_1.createMongoDBConnection('mongodb://localhost/nodeless');
        const conn = yield amqplib_1.default.connect(CONN_URL);
        const channel = yield conn.createChannel();
        channel.prefetch(1);
        yield channel.assertQueue(queue, { durable: false });
        channel.consume(queue, (msg) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { functionId: _id, params } = parseQueueMessage(msg.content);
                if (!functions[_id]) {
                    functions[_id] = yield util_1.Func.findOne({ _id });
                }
                const func = functions[_id];
                const vm = new vm2_1.NodeVM({
                    console: 'inherit',
                    sandbox: {},
                });
                const { default: worker } = vm.run(func.code);
                const result = worker(params);
                const data = JSON.stringify(result) || '';
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(data), { correlationId: msg.properties.correlationId });
            }
            catch (err) {
                console.error(err);
            }
            yield channel.ack(msg);
        }));
    }
    catch (err) {
        console.error(err);
    }
}))();
//# sourceMappingURL=server.js.map