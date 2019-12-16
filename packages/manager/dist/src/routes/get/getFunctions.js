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
const getFunctions = express_1.Router();
exports.getFunctions = getFunctions;
function getFunctionsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const funcs = yield util_1.Func.find({});
            messages_1.createSuccessResponse(res, funcs.map(func => func.getShortResponse()));
        }
        catch (err) {
            console.log(err);
            messages_1.createErrorResponse(res, 400);
        }
    });
}
getFunctions.get('/', getFunctionsController);
//# sourceMappingURL=getFunctions.js.map