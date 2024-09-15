"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
var t;
(function (t) {
    t[t["string"] = 0] = "string";
    t[t["number"] = 1] = "number";
    t[t["boolean"] = 2] = "boolean";
})(t || (t = {}));
class Sanitizer {
    constructor() {
        return this;
    }
    filter({ data, props, removeNullAndUndefined = false, removeEmptyStrings = false, removeNull = false, removeUndefined = false, defaultValues = null, }) {
        const toFilter = (value) => {
            let entries = Object.entries(value);
            if (props) {
                entries = entries.filter(([key]) => props.includes(key));
            }
            if (removeEmptyStrings) {
                entries = entries.filter(([_, val]) => Helpers_1.string.isEmpty(val));
            }
            if (removeNullAndUndefined) {
                entries = entries.filter(([_, val]) => !Helpers_1.types.isNull(val) && !Helpers_1.types.isUndefined(val));
            }
            if (removeNull) {
                entries = entries.filter(([_, val]) => !Helpers_1.types.isNull(val));
            }
            if (removeUndefined) {
                entries = entries.filter(([_, val]) => !Helpers_1.types.isUndefined(val));
            }
            if (defaultValues) {
                entries = entries.map(([key, val]) => {
                    if (Helpers_1.types.isNull(val) || Helpers_1.types.isUndefined(val)) {
                        return [key, defaultValues[key]];
                    }
                    return [key, val];
                });
            }
            return Object.fromEntries(entries);
        };
        const applyDefaults = (value) => {
            return defaultValues ? { ...defaultValues, ...value } : value;
        };
        return Array.isArray(data)
            ? data
                .filter((obj) => !Helpers_1.types.isNull(obj) && !Helpers_1.types.isUndefined(obj))
                .filter((obj) => Helpers_1.types.isObject(obj))
                .map((obj) => applyDefaults(obj))
                .map((obj) => toFilter(obj))
                .filter((obj) => Object.keys(obj).length !== 0)
            : toFilter(applyDefaults(data));
    }
    filterAndTypeQS({ qs, schema, }) {
        const filtered = this.filter({
            data: qs,
            props: Object.keys(schema),
            removeNullAndUndefined: true,
        });
        for (const [key, type] of Object.entries(schema)) {
            if (!filtered[key]) {
                continue;
            }
            if (type === 'number') {
                const value = Number(filtered[key]);
                if (isNaN(value)) {
                    return {
                        isValid: false,
                        msg: `el parametro '${key}' debe ser un número`,
                        newQs: null,
                    };
                }
                filtered[key] = value;
            }
            if (type === 'boolean') {
                filtered[key] = Boolean(filtered[key]);
            }
        }
        return {
            isValid: true,
            msg: null,
            newQs: filtered,
        };
    }
}
exports.default = new Sanitizer();
//# sourceMappingURL=Sanitizer.js.map