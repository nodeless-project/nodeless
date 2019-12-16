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
const cli_progress_1 = __importDefault(require("cli-progress"));
const util_1 = require("@nodeless/util");
function rm(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const progess = new cli_progress_1.default.SingleBar({}, cli_progress_1.default.Presets.shades_classic);
        progess.start(100, 0);
        try {
            yield util_1.createMongoDBConnection('mongodb://localhost/nodeless');
            progess.update(50);
            yield util_1.Func.deleteOne({ title: name });
            progess.update(100);
            progess.stop();
        }
        catch (err) {
            progess.stop();
            console.error(err);
        }
    });
}
exports.rm = rm;
//# sourceMappingURL=rm.js.map