"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const messages_1 = require("../messages");
function checkValidation(req, res, next) {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        messages_1.createErrorResponse(res, 422, errors);
        return;
    }
    next();
}
exports.checkValidation = checkValidation;
//# sourceMappingURL=checkValidation.js.map