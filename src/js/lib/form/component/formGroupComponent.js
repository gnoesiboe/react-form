import React from 'react';
import * as componentChildHelper from './../helper/componentChildHelper';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormGroupComponent extends React.Component {

    _augmentChildrenFormElements(children) {
        return componentChildHelper.cloneChildFormElements(
            children,
            child => this._cloneChildAndAppendListeners(child)
        );
    }

    /**
     * @param {String} identifier
     * @param {String} newValue
     *
     * @private
     */
    _onFieldValueChange(identifier, newValue) {
        console.log('on field value change in form group: ', identifier, newValue);
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
     * @returns {XML}
     */
    render() {
        var children = this._augmentChildrenFormElements(this.props.children);

        return (
            <div className="form-group has-success has-feedback">
                {children}
            </div>
        );
    }
}

FormGroupComponent.defaultProps = {
    onValueChange: null
};

FormGroupComponent.propTypes = {
    onValueChange: React.PropTypes.func
};

export default FormGroupComponent;
