import _ from 'lodash';
import Validator from './../validator';

const DEFAULT_INVALID_MINLENGTH_MESSAGE = 'Minimal length required of {minLength} characters';
const DEFAULT_INVALID_MAX_LENGTH_MESSAGE = 'Maximum length required of {maxLength} characters';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class LengthValidator extends Validator {

    /**
     * @param {Number=} minLength
     * @param {Number=} maxLength
     * @param {String=} invalidMinLengthMessage
     * @param {String=} invalidMaxLengthmessage
     */
    constructor(
        minLength = null,
        maxLength = null,
        invalidMinLengthMessage = DEFAULT_INVALID_MINLENGTH_MESSAGE,
        invalidMaxLengthmessage = DEFAULT_INVALID_MAX_LENGTH_MESSAGE
    ) {
        super();

        this._minLength = minLength;
        this._maxLength = maxLength;
        this._invalidMinLengthMessage = invalidMinLengthMessage;
        this._invalidMaxLengthMessage = invalidMaxLengthmessage;
    }

    /**
     * @inheritDoc
     *
     * @param {String} value
     */
    validate(value) {
        if (!_.isString(value)) {
            throw new Error('The Length validator can only be used on strings');
        }

        if (_.isInteger(this._minLength) && value.length < this._minLength) {
            throw Validator._createValidationError(this._invalidMinLengthMessage, {
                '{value}': value,
                '{minLength}': this._minLength,
                '{maxLength}': this._maxLength
            })
        }

        if (_.isInteger(this._maxLength) && value.length > this._maxLength) {
            throw Validator._createValidationError(this._invalidMaxLengthMessage, {
                '{value}': value,
                '{minLength}': this._minLength,
                '{maxLength}': this._maxLength
            });
        }
    }
}

export default LengthValidator;
