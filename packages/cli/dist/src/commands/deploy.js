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
const fs_1 = __importDefault(require("fs"));
const exec_1 = __importDefault(require("../exec"));
const cli_progress_1 = __importDefault(require("cli-progress"));
const constants_1 = require("../constants");
const util_1 = require("@nodeless/util");
function deploy() {
    return __awaiter(this, void 0, void 0, function* () {
        const progess = new cli_progress_1.default.SingleBar({}, cli_progress_1.default.Presets.shades_classic);
        progess.start(100, 0);
        try {
            yield util_1.createMongoDBConnection('mongodb://localhost/nodeless');
            progess.update(10);
            const pjson = require(`${constants_1.CURRENT_DIR}/package.json`);
            const name = pjson.name;
            let code = '';
            progess.update(40);
            yield exec_1.default(`yarn build`);
            progess.update(60);
            code = fs_1.default.readFileSync('./dist/main.js', 'utf8');
            progess.update(80);
            yield util_1.Func.create({ title: name, code: code });
            progess.update(100);
            progess.stop();
        }
        catch (err) {
            progess.stop();
            console.error(err);
        }
    });
}
exports.deploy = deploy;
//# sourceMappingURL=deploy.js.map