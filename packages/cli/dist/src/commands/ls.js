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
function ls() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield util_1.createMongoDBConnection('mongodb://localhost/nodeless');
            let funcs = yield util_1.Func.find().select('title code');
            funcs = funcs.map(item => item.toObject());
            console.table(funcs, ['_id', 'title']);
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.ls = ls;
//# sourceMappingURL=ls.js.map