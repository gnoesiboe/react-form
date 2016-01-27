import React from 'react';
import _ from 'lodash';
import FormElementComponent from './formElementComponent';
import { generateFormElementId } from './../helper/identifierHelper';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormInputComponent extends FormElementComponent {

    /**
     * @inheritDoc
     *
     * @returns {XML}
     */
    render() {
        return (
            <input type={this.props.type}
                   name={this.props.identifier}
                   id={generateFormElementId(this.props.identifier)}
                   value={this.state.value}
                   onFocus={this._onFocus.bind(this)}
                   onBlur={this._onBlur.bind(this)}
                   onChange={this._onChange.bind(this)}
                   className={this.props.className} />
        );
    }
}

FormInputComponent.defaultProps = _.extend({}, FormElementComponent.defaultProps, {
    type: 'text',
    value: ''
});

FormInputComponent.propTypes = _.extend({}, FormElementComponent.propTypes, {
    type: React.PropTypes.string.isRequired
});

export default FormInputComponent;
