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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_1 = require("../../messages");
const util_1 = require("@nodeless/util");
const middlewares_1 = require("../../middlewares");
const express_validator_1 = require("express-validator");
const getFunctionById = express_1.Router();
exports.getFunctionById = getFunctionById;
function getFunctionsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id: _id } = req.params;
            const func = yield util_1.Func.findOne({ _id });
            messages_1.createSuccessResponse(res, func.getResponse());
        }
        catch (err) {
            console.log(err);
            messages_1.createErrorResponse(res, 400);
        }
    });
}
getFunctionById.get('/:id', [express_validator_1.param('id').isMongoId()], middlewares_1.checkValidation, getFunctionsController);
//# sourceMappingURL=getFunctionById.js.map