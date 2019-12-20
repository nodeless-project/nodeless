"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.generateUUID = generateUUID;
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
function compareCorrelationIdInMessage(id, message) {
    return id === message.properties.correlationId;
}
exports.compareCorrelationIdInMessage = compareCorrelationIdInMessage;
function getFunctionAction(functionId, params) {
    return { functionId, params };
}
exports.getFunctionAction = getFunctionAction;
//# sourceMappingURL=helper.js.map