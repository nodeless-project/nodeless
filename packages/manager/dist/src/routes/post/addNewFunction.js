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
const util_1 = require("@nodeless/util");
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const messages_1 = require("../../messages");
const express_validator_1 = require("express-validator");
const addNewFunction = express_1.Router();
exports.addNewFunction = addNewFunction;
function addNewFunctionController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, code } = req.body;
            const func = util_1.Func({ title, code });
            yield func.save();
            messages_1.createSuccessResponse(res, func.getShortResponse());
        }
        catch (err) {
            console.log(err);
            messages_1.createErrorResponse(res, 400);
        }
    });
}
addNewFunction.post('/', [express_validator_1.body('title').isString(), express_validator_1.body('code').isString()], middlewares_1.checkValidation, addNewFunctionController);
//# sourceMappingURL=addNewFunction.js.map