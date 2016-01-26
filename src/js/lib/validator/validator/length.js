import _ from 'lodash';
import Validator from './../validator';

var _defaultInvalidMinLengthMessage = 'Minimal length required of {minLength} characters';
var _defaultInvalidMaxLengthMessage = 'Maximum length required of {maxLength} characters';

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
        invalidMinLengthMessage = _defaultInvalidMinLengthMessage,
        invalidMaxLengthmessage = _defaultInvalidMaxLengthMessage
    ) {
        super();

        this._minLength = minLength;
        this._maxLength = maxLength;
        this._invalidMinLengthMessage = invalidMinLengthMessage;
        this._invalidMaxLengthMessage = invalidMaxLengthmessage;
    }

    /**
     * @param {String} value
     *
     * @returns {boolean}
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
