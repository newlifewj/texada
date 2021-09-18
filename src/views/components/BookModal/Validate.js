import validator from 'validator';
import moment from 'moment';

const validate = (key, model) => {
    const test = {
        fromDate: () => {
            return validator.isBefore(model.fromDate, moment().format("YYYY-MM-DD"))
            ? "Invalid staring date" : null;
        },
        toDate: () => {
            return validator.isBefore(model.toDate, model.fromDate.trim().length === 0 ? moment().format("YYYY-MM-DD") : model.fromDate)
            ? "Invalid end date" : null;
        }
    };
    return test[key] === undefined ? null : test[key]();
};

export default validate;