import ValidationError from './error/validationError';
import { replace } from './utility/stringHelper';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class Validator {

    validate(value) {
        throw new Error('Validator.validate should be extended');
    }

    /**
     * @param {String} message
     * @param {Object=} replacements
     *
     * @return {ValidationError}
     *
     * @protected
     */
    static _createValidationError(message, replacements = {}) {
        return new ValidationError(
            replace(message, replacements)
        );
    }
}

export default Validator;
