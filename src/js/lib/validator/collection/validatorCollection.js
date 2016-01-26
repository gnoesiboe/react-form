import Validator from './../validator';
import ValidationError from './../error/validationError';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class ValidatorCollection {

    /**
     * @param {Array=} validators
     */
    constructor(validators = []) {
        this._validators = [];

        this.addValidators(validators);
    }

    /**
     * @param {Array} validators
     */
    addValidators(validators) {
        validators.forEach(validator => {
            this.addValidator(validator);
        });
    }

    /**
     * @param {Validator} validator
     */
    addValidator(validator) {
        if (!validator instanceof Validator) {
            throw new Error('Expecting an instance of Validator');
        }

        this._validators.push(validator);
    }

    /**
     * @param {*} value
     *
     * @returns {Array}
     */
    validate(value) {
        var errors = [];

        this._validators.forEach(validator => {
            try {
                validator.validate(value);
            } catch (error) {
                if (!error instanceof ValidationError) {
                    throw error;
                }

                errors.push(error.message);
            }
        });

        return errors;
    }
}

export default ValidatorCollection;
