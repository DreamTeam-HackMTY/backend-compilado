"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const DATE_FORMATS = {
    FULL: 'yyyy-MM-dd HH:mm:ss',
    DATE: 'yyyy-MM-dd',
};
class FormatDates {
    constructor() {
        this.localZone = 'America/Monterrey';
        this.fullFormat = DATE_FORMATS.FULL;
        this.dateFormat = DATE_FORMATS.DATE;
        return this;
    }
    getLocalZone() {
        return this.localZone;
    }
    getFullFormat() {
        return this.fullFormat;
    }
    getDateFormat() {
        return this.dateFormat;
    }
    setZone({ zone }) {
        this.localZone = zone;
    }
    now() {
        return luxon_1.DateTime.now().setZone(this.localZone);
    }
    isValidDateTime({ date, format, }) {
        const { isValid, invalidReason } = luxon_1.DateTime.fromFormat(date, format).setZone(this.localZone);
        return {
            isValid,
            invalidReason,
        };
    }
    stringToDateTime({ onlyDate, onlyTime, fullDateTime, format, }) {
        format = format ?? this.fullFormat;
        if (onlyDate && !onlyTime) {
            return luxon_1.DateTime.fromFormat(`${onlyDate} 00:00:00`, format).setZone(this.localZone);
        }
        if (!onlyDate && onlyTime) {
            const now = luxon_1.DateTime.now()
                .setZone(this.localZone)
                .toFormat(this.dateFormat);
            return luxon_1.DateTime.fromFormat(`${now} ${onlyTime}`, format).setZone(this.localZone);
        }
        if (onlyDate && onlyTime) {
            return luxon_1.DateTime.fromFormat(`${onlyDate} ${onlyTime}`, format).setZone(this.localZone);
        }
        if (fullDateTime) {
            return luxon_1.DateTime.fromFormat(fullDateTime, format).setZone(this.localZone);
        }
        return luxon_1.DateTime.now().setZone(this.localZone);
    }
    serializeDates(params) {
        return {
            serialize: (value) => value
                .setZone(this.localZone)
                .toFormat(params?.format ?? this.fullFormat),
        };
    }
    convertToLocalZone(date) {
        const _date = luxon_1.DateTime.fromJSDate(date).setZone(this.localZone);
        return this.serializeDates({ format: this.fullFormat }).serialize(_date);
    }
    convertDateTimeToDate({ date, format, }) {
        const _date = luxon_1.DateTime.fromFormat(date, format).setZone(this.localZone);
        return _date.toJSDate();
    }
    validateDates({ start, end }) {
        const start_date = luxon_1.DateTime.fromFormat(start, this.dateFormat).setZone(this.localZone);
        const end_date = luxon_1.DateTime.fromFormat(end, this.dateFormat).setZone(this.localZone);
        if (!start_date.isValid || !end_date.isValid) {
            return {
                isValid: false,
                message: 'Las fechas no son válidas.',
                data: {
                    start: start_date.invalidReason,
                    end: end_date.invalidReason,
                },
            };
        }
        if (start_date > end_date) {
            return {
                isValid: false,
                message: 'La fecha de inicio no puede ser mayor a la fecha de fin.',
                data: {
                    start: start_date.toFormat(this.dateFormat),
                    end: end_date.toFormat(this.dateFormat),
                },
            };
        }
        return {
            isValid: true,
            message: null,
            data: null,
        };
    }
}
exports.default = new FormatDates();
//# sourceMappingURL=FormatDates.js.map