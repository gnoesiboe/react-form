/**
 * @param {String} value
 * @param {Object} replacements
 *
 * @return {String}
 */
export function replace(value, replacements) {
    var out = value;

    for (let key in replacements) {
        if (replacements.hasOwnProperty(key)) {
            let regex = new RegExp(key, 'g');

            out = out.replace(regex, replacements[key]);
        }
    }

    return out;
}
