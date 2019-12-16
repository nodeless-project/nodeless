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
const cli_progress_1 = __importDefault(require("cli-progress"));
const download_git_repo_1 = __importDefault(require("download-git-repo"));
const exec_1 = __importDefault(require("../exec"));
const constants_1 = require("../constants");
const helper_1 = require("../helper");
function init(funcName) {
    return __awaiter(this, void 0, void 0, function* () {
        const progess = new cli_progress_1.default.SingleBar({}, cli_progress_1.default.Presets.shades_classic);
        progess.start(100, 0);
        try {
            const templatePath = `${constants_1.CLONE_PATH}/templates/func/typescript`;
            yield new Promise((resolve, reject) => download_git_repo_1.default('github:Abrax20/nodeless', constants_1.CLONE_PATH, {}, err => (err ? reject(err) : resolve())));
            progess.update(20);
            fs_1.default.mkdirSync(`${constants_1.CURRENT_DIR}/${funcName}`);
            progess.update(40);
            helper_1.createDirectoryContents(templatePath, funcName);
            progess.update(60);
            yield exec_1.default(`cd ${funcName} && npm i`);
            progess.update(80);
            yield exec_1.default(`rm -fr ${constants_1.CLONE_PATH}`);
            progess.update(100);
            progess.stop();
        }
        catch (err) {
            progess.stop();
            console.error(err);
        }
    });
}
exports.init = init;
//# sourceMappingURL=init.js.map