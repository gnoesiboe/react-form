import React from 'react';
import _ from 'lodash';
import FormElementComponent from './formElementComponent';
import FormSubmitComponent from './formSubmitComponent';
import FormGroupComponent from './formGroupComponent'
import * as componentChildHelper from './../helper/componentChildHelper';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormComponent extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = FormComponent._getInitialState();

        this._childrenBlueprints = null;
        this._childrenInstances = [];
    }

    /**
     * @returns {Object}
     *
     * @private
     */
    static _getInitialState() {
        return {
            values: {},
            errors: {}
        };
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this._importInitialValuesStateFromChildFormElements();
    }

    /**
     * @inheritdoc
     */
    componentWillUnmount() {
        this._childrenBlueprints =  null;
        this._childrenInstances = [];
    }

    /**
     * @private
     */
    _importInitialValuesStateFromChildFormElements() {
        var newValues = _.extend(
            {},
            this.state.values,
            componentChildHelper.extractValuesFromChildFormElements(this._childrenBlueprints)
        );

        var stateUpdates = {
            values: newValues
        };

        this.setState(stateUpdates);
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onSubmit(event) {

        // prevent backend submission
        event.preventDefault();

        this._validate();

        this.props.onSubmit(this.state.values);
    }

    /**
     * @private
     */
    _validate() {
        this._childrenInstances.forEach(child => {
            child.validate();
        });
    }

    /**
     * @param {String} identifier
     * @param {String} newValue
     *
     * @private
     */
    _onFieldValueChange(identifier, newValue) {
        this._setValue(identifier, newValue);
    }

    /**
     * @param {String} identifier
     * @param {String} newValue
     *
     * @private
     */
    _setValue(identifier, newValue) {
        var newValues = _.extend({}, this.state.values);
        newValues[identifier] = newValue;

        var stateUpdates = {
            values: newValues
        };

        this.setState(stateUpdates);
    }

    /**
     * @private
     */
    _onFieldInvalid(fieldIdentifier) {
        this._setFieldErrorState(fieldIdentifier, false);
    }

    /**
     * @private
     */
    _onFieldValid(fieldIdentifier) {
        this._setFieldErrorState(fieldIdentifier, true);
    }

    /**
     * @param {String} fieldIdentifier
     * @param {Boolean} isValid
     *
     * @private
     */
    _setFieldErrorState(fieldIdentifier, isValid) {
        var errors = this.state.errors;
        errors[fieldIdentifier] = isValid;

        this.setState({
            errors: errors
        });
    }

    /**
     * @param {FormElementComponent} mountedComponent
     *
     * @private
     */
    _onFieldMounted(mountedComponent) {
        if (mountedComponent instanceof FormElementComponent || mountedComponent instanceof FormSubmitComponent) {
            this._childrenInstances.push(mountedComponent);
        }
    }

    /**
     * @param {React.Component} child
     *
     * @returns {React.Component}
     *
     * @private
     */
    _cloneChildAndAppendListeners(child) {
        var currentProps = typeof child.props !== 'undefined' ? child.props : {};

        var newOnValueChange = typeof currentProps.onValueChange === 'undefined' || !_.isFunction(currentProps.onValueChange)
            ? this._onFieldValueChange.bind(this)
            : componentChildHelper.wrapEventListener(currentProps.onValueChange, this._onFieldValueChange.bind(this));

        var newOnInvalid = typeof currentProps.onInvalid === 'undefined' || !_.isFunction(currentProps.onInvalid)
            ? this._onFieldInvalid.bind(this)
            : componentChildHelper.wrapEventListener(currentProps.onInvalid, this._onFieldInvalid.bind(this));

        var newOnValid = typeof currentProps.onValid === 'undefined' || !_.isFunction(currentProps.onValid)
            ? this._onFieldValid.bind(this)
            : componentChildHelper.wrapEventListener(currentProps.onValid, this._onFieldValid.bind(this));

        var newRef = typeof currentProps.ref === 'undefined' || !_.isFunction(currentProps.ref)
            ? this._onFieldMounted.bind(this)
            : componentChildHelper.wrapEventListener(currentProps.ref, this._onFieldMounted.bind(this));

        return React.cloneElement(child, {

            // add some event listeners to be able to track for changes
            onValueChange: newOnValueChange,
            onInvalid: newOnInvalid,
            onValid: newOnValid,

            // hold a reference to the mounted component to be able to talk to it
            ref: newRef
        });
    }

    /**
     * @param {React.Component|Array} children
     *
     * @returns {Array}
     *
     * @private
     *
     * @see https://facebook.github.io/react/blog/2015/03/03/react-v0.13-rc2.html#react.cloneelement
     */
    _augmentChildFormGroups(children) {
        return componentChildHelper.cloneChildFormElements(
            children,
            child => this._cloneChildAndAppendListeners(child)
        );
    }

    /**
     * @returns {XML}
     */
    render() {
        this._childrenBlueprints = this._augmentChildFormGroups(this.props.children);

        return (
            <form action="#"
                  method="POST"
                  className="form"
                  onSubmit={this._onSubmit.bind(this)}>

                {this._childrenBlueprints}
            </form>
        );
    }
}

FormComponent.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
};

export default FormComponent;
