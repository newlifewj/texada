import validator from 'validator';

const validate = (key, model) => {
    const test = {
        mileage: () => {
            return `${model.mileage}`.trim().length === 0 && model.product && model.product.type !== "plain"
                ? "mileage is required" : null;
        }
    };
    return test[key] === undefined ? null : test[key]();
};

export default validate;