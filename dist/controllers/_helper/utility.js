"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require('os');
const ifaces = os.networkInterfaces();
const ResponseFormat_1 = require("../interfaces/common/ResponseFormat");
class Utility {
    /**
     * @function generateResponse
     * @description used to create custom response
     * @param statusCode
     * @param message
     * @param isSuccess
     * @param data
     */
    static generateResponse(statusCode, message, isSuccess, data) {
        let _responseFormat = new ResponseFormat_1.IResponseFormat();
        return _responseFormat = {
            statusCode,
            message,
            isSuccess,
            data
        };
    }
}
exports.default = Utility;
//# sourceMappingURL=utility.js.map