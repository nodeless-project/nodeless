"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./constants");
function createDirectoryContents(templatePath, projectName) {
    const filesToCreate = fs_1.default.readdirSync(templatePath);
    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;
        const stats = fs_1.default.statSync(origFilePath);
        if (stats.isFile()) {
            const contents = fs_1.default.readFileSync(origFilePath, 'utf8').replace(/\%project\%/g, projectName);
            const writePath = `${constants_1.CURRENT_DIR}/${projectName}/${file}`;
            fs_1.default.writeFileSync(writePath, contents, 'utf8');
        }
        else if (stats.isDirectory()) {
            fs_1.default.mkdirSync(`${constants_1.CURRENT_DIR}/${projectName}/${file}`);
            createDirectoryContents(`${templatePath}/${file}`, `${projectName}/${file}`);
        }
    });
}
exports.createDirectoryContents = createDirectoryContents;
//# sourceMappingURL=helper.js.map