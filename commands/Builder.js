"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const execa_1 = __importDefault(require("execa"));
class Builder extends standalone_1.BaseCommand {
    async run() {
        if (Env_1.default.get('NODE_ENV') !== 'development') {
            this.logger.error('This command can only be run in development mode');
            await this.exit();
        }
        this.logger.info('Compiling the application...');
        try {
            await execa_1.default.node('ace', ['type-check'], {
                stdio: 'inherit',
            });
        }
        catch (error) {
            this.logger.error(error);
            process.exit(1);
        }
        try {
            await execa_1.default.node('ace', ['build', '--production'], {
                stdio: 'inherit',
            });
        }
        catch (error) {
            this.logger.error(error);
            process.exit(1);
        }
        this.logger.success('Application compiled successfully');
    }
}
exports.default = Builder;
Builder.commandName = 'builder';
Builder.description = 'Custom command to compile the application from Typescript to Javascript.';
Builder.settings = {
    loadApp: true,
    stayAlive: false,
};
//# sourceMappingURL=Builder.js.map