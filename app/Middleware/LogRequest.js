"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogRequest {
    async handle({ request, logger }, next) {
        logger.info(`${request.method()} => ${request.url()}`);
        await next();
    }
}
exports.default = LogRequest;
//# sourceMappingURL=LogRequest.js.map