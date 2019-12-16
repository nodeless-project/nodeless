"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
function createErrorResponseBody(errorCode, body = {}) {
    return Object.assign({ success: false, status: errorCode, msg: errors_1.errorMessages[errorCode], error: true }, body);
}
exports.createErrorResponseBody = createErrorResponseBody;
function createErrorResponse(res, errorCode, body = {}) {
    res && res.status && res.status(errorCode).json(createErrorResponseBody(errorCode, body));
}
exports.createErrorResponse = createErrorResponse;
//# sourceMappingURL=createErrorResponse.js.map