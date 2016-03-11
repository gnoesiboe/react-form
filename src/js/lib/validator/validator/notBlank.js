import _ from 'lodash';
import Validator from './../validator';

const DEFAULT_INVALID_MESSAGE = 'Cannot be blank';;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class NotBlankValidator extends Validator {

    /**
     * @param {String=} invalidMessage
     */
    constructor(invalidMessage = DEFAULT_INVALID_MESSAGE) {
        super();

        this._invalidMessage = invalidMessage;
    }

    /**
     * @param {String} value
     *
     * @returns {boolean}
     */
    validate(value) {
        if (value === null) {
            throw this._createInvalidError(value);
        }

        if (!_.isString(value)) {
            throw new Error('The NotBlank validator can only be used on strings');
        }

        if (value.length === 0) {
            throw this._createInvalidError(value);
        }
    }

    /**
     * @param value
     *
     * @return {ValidationError}
     *
     * @private
     */
    _createInvalidError(value) {
        return Validator._createValidationError(this._invalidMessage, {
            '{value}': value
        })
    }
}

export default NotBlankValidator;
