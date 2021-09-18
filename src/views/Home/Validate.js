/* eslint-disable no-undefined */
/**
 * The validate module can isolate the 'dirty' validation stuffs from form component.
 * The validate module could import more dependencies, or depend nothing.
 * Call 'validate(model, field)' to validate the value of 'model[field]' - one property in the model.
 * Return ture for passed, feedback message for error. Integrated with i18n for translating
 */
import validator from 'validator';

const validate = (key, model) => {
    // ------------------------- custom for current form
    const test = {
        email: () => {
            return validator.isEmail( model.email )
                    ? null : "Valid Email is required";
        },
        password: () => {
            return validator.isLength( model.password, { min: 6, max: 30 } )
                    ? null : "Password (minLengh 6) is required";
        }
    };
    // --------------------------

    return test[key] === undefined ? null : test[key]();
};

export default validate;