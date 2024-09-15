"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Mail");
const View_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/View"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const mjml_1 = __importDefault(require("mjml"));
var Options;
(function (Options) {
    Options[Options["emails/Passwords/view_password"] = 0] = "emails/Passwords/view_password";
})(Options || (Options = {}));
class SenderMail extends Mail_1.BaseMailer {
    constructor({ user, subject, data, view, }) {
        super();
        this.mailer = this.mail.use('smtp');
        this.user = user;
        this.subject = subject;
        this.data = data;
        this.view = view;
    }
    async prepare(message) {
        const render = await View_1.default.render(this.view, {
            ...this.data,
            user: this.user,
        });
        const viewMjml = (0, mjml_1.default)(render);
        message
            .from(Env_1.default.get('SMTP_USERNAME'))
            .to(this.user.email)
            .subject(this.subject)
            .html(viewMjml.html);
    }
}
exports.default = SenderMail;
//# sourceMappingURL=SenderMail.js.map