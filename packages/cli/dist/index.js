#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const commands_1 = require("./src/commands");
commander_1.default.version('0.1.0');
commander_1.default
    .command('init')
    .arguments('<func>')
    .description('Create a new function')
    .action(commands_1.init);
commander_1.default
    .command('ls')
    .description('Lists all functions in the database')
    .action(commands_1.ls);
commander_1.default
    .command('deploy')
    .description('Deploys the function in the current folder')
    .action(commands_1.deploy);
commander_1.default
    .command('call')
    .arguments('<name> [params]')
    .description('Calls the function with the given name and optionally with the given params')
    .action(commands_1.call);
commander_1.default
    .command('rm')
    .arguments('<name>')
    .description('Removes the function with the given name')
    .action(commands_1.rm);
commander_1.default.parse(process.argv);
//# sourceMappingURL=index.js.map