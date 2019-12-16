"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var func_1 = require("./src/models/func");
exports.Func = func_1.Func;
var createMongoDBConnection_1 = require("./src/createMongoDBConnection");
exports.createMongoDBConnection = createMongoDBConnection_1.createMongoDBConnection;
__export(require("./src/helper"));
//# sourceMappingURL=index.js.map