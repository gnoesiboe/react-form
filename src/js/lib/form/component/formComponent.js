import React from 'react';
import _ from 'lodash';
import FormElementComponent from './formElementComponent';
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

        this.state = {
            values: {}
        };

        this._children = null;
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this._importInitialValuesStateFromChildFormElements();
    }

    /**
     * @private
     */
    _importInitialValuesStateFromChildFormElements() {
        var newValues = _.extend(
            {},
            this.state.values,
            componentChildHelper.extractValuesFromChildFormElements(this._children)
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

        this.props.onSubmit(this.state.values);
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
     * @param {React.Component} child
     *
     * @returns {React.Component}
     *
     * @private
     */
    _cloneChildAndAppendListeners(child) {
        var currentProps = typeof child.props !== 'undefined' ? child.props : {},
            newOnValueChange = this._onFieldValueChange.bind(this);

        // if an onValueChange listener is already applied, wrap it to append our own listener
        if (typeof currentProps.onValueChange !== 'undefined' && _.isFunction(currentProps.onValueChange)) {
            newOnValueChange = (identifier, newValue) => {
                currentProps.onValueChange(identifier, newValue);
                this._onFieldValueChange(identifier, newValue);
            };
        }

        return React.cloneElement(child, {
            onValueChange: newOnValueChange
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
        this._children = this._augmentChildFormGroups(this.props.children);

        return (
            <form action="#"
                  method="POST"
                  className="form"
                  onSubmit={this._onSubmit.bind(this)}>

                {this._children}
            </form>
        );
    }
}

FormComponent.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
};

export default FormComponent;
