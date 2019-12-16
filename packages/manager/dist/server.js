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
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const messages_1 = require("./src/messages");
const routes_1 = __importDefault(require("./src/routes"));
const constants_1 = require("./src/constants");
const util_1 = require("@nodeless/util");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(helmet_1.default());
    app.use(compression_1.default());
    app.use(express_1.default.json());
    app.use(cors_1.default({ credentials: true, optionsSuccessStatus: 200 }));
    app.use(morgan_1.default(constants_1.LOG_TYPE));
    yield util_1.createMongoDBConnection(constants_1.MONGODB_URI);
    app.use(constants_1.BASE_PATH, routes_1.default);
    app.use('*', (req, res) => {
        messages_1.createErrorResponse(res, 404);
    });
    app.listen(constants_1.PORT, () => {
        console.log(`Nodeless-Manager is up and running...`);
    });
}))();
//# sourceMappingURL=server.js.map