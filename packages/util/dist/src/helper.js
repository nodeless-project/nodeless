"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
function isObjectId(value) {
    return mongoose_1.Types.ObjectId.isValid(value);
}
exports.isObjectId = isObjectId;
function writeValueToObject(object, key, value) {
    if (!value && value !== null && typeof value !== 'boolean' && typeof value !== 'number') {
        return;
    }
    if (typeof value === 'string') {
        object[key] = value.trim();
        return;
    }
    object[key] = value;
}
exports.writeValueToObject = writeValueToObject;
//# sourceMappingURL=helper.js.map