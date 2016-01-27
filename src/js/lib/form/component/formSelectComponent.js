import React from 'react';
import _ from 'lodash';
import FormElementComponent from './formElementComponent';
import { generateFormElementId } from './../helper/identifierHelper';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormSelectComponent extends FormElementComponent {

    /**
     * @param {Object} options
     *
     * @returns {Array}
     *
     * @private
     */
    static _renderOptions(options) {
        var out = [];

        for (let value in options) {
            if (options.hasOwnProperty(value)) {
                let label = options[value];

                if (_.isObject(label)) {
                    out.push(FormSelectComponent._renderOptGroup(value, label, value));
                } else {
                    out.push(FormSelectComponent._renderOption(value, label));
                }
            }
        }

        return out;
    }

    /**
     * @param {String} key
     * @param {Object} options
     * @param {String} label
     *
     * @returns {XML}
     *
     * @private
     */
    static _renderOptGroup(key, options, label) {
        return (
            <optgroup label={label}
                      key={key}>
                {FormSelectComponent._renderOptions(options)}
            </optgroup>
        );
    }

    /**
     * @param {String} value
     * @param {String} label
     *
     * @returns {XML}
     *
     * @private
     */
    static _renderOption(value, label) {
        return (
            <option key={value}
                    value={value}>{label}</option>
        );
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <select value={this.state.value}
                    onFocus={this._onFocus.bind(this)}
                    onBlur={this._onBlur.bind(this)}
                    onChange={this._onChange.bind(this)}
                    className={this.props.className}>
                {FormSelectComponent._renderOptions(this.props.options)}
            </select>
        );
    }
}

FormSelectComponent.defaultProps = _.extend({}, FormElementComponent.defaultProps, {
    options: {}
});

FormSelectComponent.propTypes = _.extend({}, FormElementComponent.propTypes, {
    options: React.PropTypes.object.isRequired
});

export default FormSelectComponent;
