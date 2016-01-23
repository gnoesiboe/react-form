import React from 'react';
import * as componentChildHelper from './../helper/componentChildHelper';

const STATUS_ERROR = 'error';
const STATUS_SUCCESS = 'success';
const STATUS_PENDING = 'pending';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormGroupComponent extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            status: STATUS_PENDING
        };
    }

    /**
     * @param {Array} children
     *
     * @returns {Array}
     *
     * @private
     */
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
     * @returns {String}
     *
     * @private
     */
    _defineClassName() {
        var out = ['form-group'];

        switch (this.state.status) {
            case STATUS_ERROR:
                out.push('has-error');
                out.push('has-feedback');
                break;

            case STATUS_SUCCESS:
                out.push('has-success');
                out.push('has-feedback');
                break;

            default:
                break;
        }

        return out.join(' ');
    }

    /**
     * @returns {XML}
     */
    render() {
        var children = this._augmentChildrenFormElements(this.props.children);

        return (
            <div className={this._defineClassName()}>
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
