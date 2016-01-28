import React from 'react';
import * as formElementStatus from './../constant/formElementStatus';
import ValidationCollection from './../../validator/collection/validatorCollection';

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
     * @inheritDoc
     */
    componentDidMount() {

        // emit invalid state if this field has validation errors directly after mount, to let the form know
        // that it cannot submit yet
        if (this._getCurrentErrors().length > 0) {
            this._emitInvalid(this._getCurrentErrors(), false);
        } else {
            this._emitValid(false);
        }
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
     * @param {Boolean=} display
     *
     * @protected
     */
    _emitValid(display = true) {
        if (_.isFunction(this.props.onValid)) {
            this.props.onValid(this.props.identifier, display);
        }
    }

    /**
     * @param {Array} errors
     * @param {Boolean=} display
     *
     * @protected
     */
    _emitInvalid(errors, display = true) {
        if (_.isFunction(this.props.onInvalid)) {
            this.props.onInvalid(this.props.identifier, errors, display);
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
     * @public
     */
    validate() {
        this._validate();
    }

    /**
     * @protected
     */
    _validate() {
        var errors = this._getCurrentErrors();

        if (errors.length > 0) {
            this._emitInvalid(errors);
        } else {
            this._emitValid();
        }
    }

    /**
     * @returns {Array}
     *
     * @private
     */
    _getCurrentErrors() {
        return this.props.validators.validate(this.state.value);
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
    validators: new ValidationCollection(),
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
