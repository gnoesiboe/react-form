import React from 'react';
import * as componentChildHelper from './../helper/componentChildHelper';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormGroupComponent extends React.Component {

    /*_augmentChildren(children) {
        return componentChildHelper.cloneChildFormElements(
            children,
            child => this._cloneChildAndAppendListeners
        );
    }*/

    /**
     * @param {String} identifier
     * @param {String} newValue
     *
     * @private
     */
    /*_onFieldValueChange(identifier, newValue) {
        console.log('on field value change in form group: ', identifier, newValue);
    }*/

    /**
     * @param {React.Component} child
     *
     * @returns {React.Component}
     *
     * @private
     */
    /*_cloneChildAndAppendListeners(child) {
        var currentProps = typeof child.props !== 'undefined' ? child.props : {},
            newOnValueChange = this._onFieldValueChange.bind(this);

        // if an onValueChange listener is already applied, wrap it to append our own listener
        if (typeof currentProps.onValueChange !== 'undefined' && _.isFunction(currentProps.onValueChange)) {
            newOnValueChange = function (identifier, newValue) {
                currentProps.onValueChange(identifier, newValue);
                newOnValueChange(identifier, newValue);
            };
        }

        return React.cloneElement(child, {
            onValueChange: this._onFieldValueChange.bind(this)
        });
    }*/

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="form-group has-success has-feedback">
                {this.props.children}
            </div>
        );
    }
}

FormGroupComponent.propTypes = {};

export default FormGroupComponent;
