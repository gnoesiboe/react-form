/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class ValidationError extends Error {

    /**
     * @param {String} message
     */
    constructor(message) {
        super(message);

        this.name = this.constructor.name;
        this.message = message;

        Error.captureStackTrace(this, this.constructor.name);
    }
}

export default ValidationError;
