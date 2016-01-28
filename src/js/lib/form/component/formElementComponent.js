import React from 'react';
import * as formElementStatus from './../constant/formElementStatus';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormElementComponent extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = this._defineInitialState();
    }

    /**
     * @param {Object} event
     *
     * @protected
     */
    _onChange(event) {
        this.setState({
            value: event.target.value
        }, this._onChangeAppliedToInternalState.bind(this));
    }

    /**
     * @protected
     */
    _onChangeAppliedToInternalState() {
        if (_.isFunction(this.props.onValueChange)) {
            this.props.onValueChange(this.props.identifier, this.state.value);
        }

        if (this.props.validateOnChange) {
            this._validate();
        }
    }

    /**
     * @protected
     */
    _emitValid() {
        if (_.isFunction(this.props.onValid)) {
            this.props.onValid();
        }
    }

    /**
     * @param {Array} errors
     *
     * @protected
     */
    _emitInvalid(errors) {
        if (_.isFunction(this.props.onInvalid)) {
            this.props.onInvalid(errors);
        }
    }

    /**
     * @protected
     */
    _onFocus() {
        this.setState({
            status: formElementStatus.FOCUSSED
        });
    }

    /**
     * @protected
     */
    _onBlur() {
        this.setState({
            status: formElementStatus.BLURRED
        });

        this._validate();
    }

    /**
     * @protected
     */
    _validate() {
        if (_.isObject(this.props.validators)) {
            var errors = this.props.validators.validate(this.state.value);

            if (errors.length > 0) {
                this._emitInvalid(errors);
            } else {
                this._emitValid();
            }
        }
    }

    /**
     * @returns {Object}
     *
     * @private
     */
    _defineInitialState() {
        return {
            value: this.props.value,
            status: formElementStatus.UNTOUCHED
        };
    }
}

FormElementComponent.defaultProps = {
    onValueChange: null,
    onInvalid: null,
    onValid: null,
    className: 'form-control',
    value: null,
    validators: null,
    validateOnChange: false
};

FormElementComponent.propTypes = {
    onValueChange: React.PropTypes.func,
    onInvalid: React.PropTypes.func,
    onValid: React.PropTypes.func,
    identifier: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    validators: React.PropTypes.object,
    validateOnChange: React.PropTypes.bool.isRequired
};

export default FormElementComponent;
