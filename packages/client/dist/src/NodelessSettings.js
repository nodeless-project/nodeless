"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class NodelessSettings {
    constructor({ connectionURL, functionQueue }) {
        if (!connectionURL)
            throw new Error('Connection URL is required.');
        this.connectionURL = connectionURL;
        this.functionQueue = functionQueue || constants_1.NODLESS_FUNCTIONS_QUEUE;
    }
    getConnectionURL() {
        return this.connectionURL;
    }
    setConnectionURL(connectionURL) {
        this.connectionURL = connectionURL;
    }
    getFunctionQueue() {
        return this.functionQueue;
    }
    setFunctionQueue(functionQueue) {
        this.functionQueue = functionQueue;
    }
}
exports.NodelessSettings = NodelessSettings;
//# sourceMappingURL=NodelessSettings.js.map