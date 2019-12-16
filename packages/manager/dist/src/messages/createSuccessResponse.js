"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createSuccessResponse(res, data = {}) {
    res.status(200).json({
        success: true,
        data,
    });
}
exports.createSuccessResponse = createSuccessResponse;
//# sourceMappingURL=createSuccessResponse.js.map