import React from 'react';
import _ from 'lodash';
import FormElementComponent from './formElementComponent';
import { generateFormElementId } from './../helper/identifierHelper';

const STATUS_UNTOUCHED = 'untouched';
const STATUS_FOCUSSED = 'focussed';
const STATUS_BLURRED = 'blurred';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormInputComponent extends FormElementComponent {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = this._defineInitialState();
    }

    /**
     * @returns {Object}
     *
     * @private
     */
    _defineInitialState() {
        return {
            value: this.props.value,
            status: STATUS_UNTOUCHED
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
     * @private
     */
    _onFocus() {
        this.setState({
            status: STATUS_FOCUSSED
        });
    }

    /**
     * @private
     */
    _onBlur() {
        this.setState({
            status: STATUS_BLURRED
        });
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
                   onFocus={this._onFocus.bind(this)}
                   onBlur={this._onBlur.bind(this)}
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
