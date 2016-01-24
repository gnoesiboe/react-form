import _ from 'lodash';
import Validator from './../validator';
import ValidationError from './../error/validationError';

var _defaultInvalidMessage = 'Cannot be blank';;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class NotBlankValidator extends Validator {

    /**
     * @param {String=} invalidMessage
     */
    constructor(invalidMessage = _defaultInvalidMessage) {
        super();

        this._invalidMessage = invalidMessage;
    }

    /**
     * @param {String} value
     *
     * @returns {boolean}
     */
    validate(value) {
        if (!_.isString(value)) {
            throw new Error('The NotBlank validator can only be used on strings');
        }

        if (value.length === 0) {
            throw new ValidationError(this._invalidMessage);
        }
    }
}

export default NotBlankValidator;
