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
            status: STATUS_PENDING,
            validationErrors: []
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
     * @param {Array} errors
     *
     * @private
     */
    _onFieldInvalid(errors) {
        this.setState({
            validationErrors: errors,
            status: STATUS_ERROR
        });
    }

    /**
     * @param {Array} errors
     *
     * @private
     */
    _appendValidationError(errors) {

    }

    /**
     * @returns {boolean}
     *
     * @private
     */
    _hasValidationErrors() {
        return this.state.validationErrors.length > 0;
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
            newOnValueChange = this._onFieldValueChange.bind(this),
            newOnInvalid = this._onFieldInvalid.bind(this);

        // if an onValueChange listener is already applied, wrap it to append our own listener
        if (typeof currentProps.onValueChange !== 'undefined' && _.isFunction(currentProps.onValueChange)) {
            newOnValueChange = (identifier, newValue) => {
                currentProps.onValueChange(identifier, newValue);
                this._onFieldValueChange(identifier, newValue);
            };
        }

        if (typeof currentProps.onInvalid !== 'undefined' && _.isFunction(currentProps.onInvalid)) {
            newOnInvalid = (error) => {
                currentProps.onInvalid(error);
                this._onFieldInvalid(error);
            };
        }

        return React.cloneElement(child, {
            onValueChange: newOnValueChange,
            onInvalid: newOnInvalid
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
     * @returns {XML|null}
     *
     * @private
     */
    _renderErrorList() {
        if (this.state.status !== STATUS_ERROR || this.state.validationErrors.length === 0) {
            return null;
        }

        return (
            <span className="help-block">
                <ul className="list">
                    { this.state.validationErrors.map((error, index) => {
                        return (
                            <li key={index}>{error}</li>
                        );
                    }) }
                </ul>
            </span>
        );
    }

    /**
     * @returns {XML|null}
     *
     * @private
     */
    _renderGlyphicon() {
        if (this.state.status === STATUS_PENDING) {
            return null;
        }

        var glyphicon = null;

        switch (this.state.status) {
            case STATUS_ERROR:
                glyphicon = 'glyphicon-remove';
                break;

            case STATUS_SUCCESS:
                glyphicon = 'glyphicon-ok';
                break;

            default:
                throw new Error(`Status ${this.state.status} not supported`);
        }

        var className = `glyphicon ${glyphicon} form-control-feedback`;

        return (
            <span className={className} />
        );
    }

    /**
     * @returns {XML}
     */
    render() {
        var children = this._augmentChildrenFormElements(this.props.children);

        return (
            <div className={this._defineClassName()}>
                {children}

                {this._renderGlyphicon()}
                {this._renderErrorList()}
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
