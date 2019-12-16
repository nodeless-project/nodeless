"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getFunctions_1 = require("./get/getFunctions");
const changeFunction_1 = require("./put/changeFunction");
const addNewFunction_1 = require("./post/addNewFunction");
const removeFunction_1 = require("./delete/removeFunction");
const getFunctionById_1 = require("./get/getFunctionById");
const manager = new express_1.Router();
manager.use(getFunctions_1.getFunctions);
manager.use(getFunctionById_1.getFunctionById);
manager.use(addNewFunction_1.addNewFunction);
manager.use(changeFunction_1.changeFunction);
manager.use(removeFunction_1.removeFunction);
exports.default = manager;
//# sourceMappingURL=index.js.map