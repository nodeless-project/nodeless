"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema");
const helper_1 = require("../../helper");
schema_1.FuncSchema.methods.getShortResponse = function () {
    return {
        id: this._id,
        title: this.title,
    };
};
schema_1.FuncSchema.methods.changeByObject = function ({ title, code }) {
    helper_1.writeValueToObject(this, 'code', code);
    helper_1.writeValueToObject(this, 'title', title);
};
schema_1.FuncSchema.methods.getResponse = function () {
    return {
        id: this._id,
        code: this.code,
        title: this.title,
    };
};
schema_1.FuncSchema.methods.getResponse = function () {
    return {
        id: this._id,
        code: this.code,
        title: this.title,
    };
};
exports.Func = mongoose_1.default.model('funcs', schema_1.FuncSchema);
exports.default = exports.Func;
//# sourceMappingURL=index.js.map