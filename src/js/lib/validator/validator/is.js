import _ from 'lodash';
import Validator from './../validator';

const DEFAULT_INVALID_VALUE_MESSAGE = 'The supplied value does not match the requested value: {requiredValue}';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class IsValidator extends Validator {

    /**
     * @param {*} requiredValue
     * @param {String} invalidValueMessage
     */
    constructor(requiredValue, invalidValueMessage = DEFAULT_INVALID_VALUE_MESSAGE) {
        super();

        this._requiredValue = requiredValue;
        this._invalidValueMessage = invalidValueMessage;
    }

    /**
     * @inheritDoc
     *
     * @param {*} value
     */
    validate(value) {
        if (value !== this._requiredValue) {
            throw new Validator._createValidationError(this._invalidValueMessage, {
                '{requiredValue}': this._requiredValue
            })
        }
    }
}

export default IsValidator;
