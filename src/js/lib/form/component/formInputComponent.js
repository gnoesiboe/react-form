import React from 'react';
import _ from 'lodash';
import FormElementComponent from './formElementComponent';
import { generateFormElementId } from './../helper/identifierHelper';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormInputComponent extends FormElementComponent {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };
    }

    /**
     * @param {Object} event
     */
    _onChange(event) {
        this.setState({
            value: event.target.value
        }, this._onChangeAppliedToInternalState.bind(this));
    }

    /**
     * @private
     */
    _onChangeAppliedToInternalState() {
        if (this.props.onValueChange) {
            this.props.onValueChange(this.props.identifier, this.state.value);
        } else {
            console.warn('no onValueChanged callback implemented');
        }
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <input type={this.props.type}
                   name={this.props.identifier}
                   id={generateFormElementId(this.props.identifier)}
                   value={this.state.value}
                   onChange={this._onChange.bind(this)}
                   className={this.props.className} />
        );
    }
}

FormInputComponent.defaultProps = {
    type: 'text',
    onValueChange: null,
    className: 'form-control',
    value: null
};

FormInputComponent.propTypes = {
    onValueChange: React.PropTypes.func,
    identifier: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    value: React.PropTypes.string
};

export default FormInputComponent;
