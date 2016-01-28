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
            validationErrors: [],
            displayValidationStatus: false
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
        //@todo still in use? Otherwise remove callback
    }

    /**
     * @param {Array} errors
     * @param {Boolean} display
     *
     * @private
     */
    _onFieldInvalid(errors, display) {
        this.setState({
            validationErrors: errors,
            status: STATUS_ERROR,
            displayValidationStatus: display
        });
    }

    /**
     * @param {Boolean} display
     *
     * @private
     */
    _onFieldValid(display) {
        this.setState({
            validationErrors: [],
            status: STATUS_SUCCESS,
            displayValidationStatus: display
        });
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
            newOnInvalid = this._onFieldInvalid.bind(this),
            newOnValid = this._onFieldValid.bind(this);

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

        if (typeof currentProps.onValid !== 'undefined' && _.isFunction(currentProps.onValid)) {
            newOnValid = () => {
                currentProps.onValid();
                this._onFieldValid();
            };
        }

        return React.cloneElement(child, {
            onValueChange: newOnValueChange,
            onInvalid: newOnInvalid,
            onValid: newOnValid
        });
    }

    /**
     * @returns {String}
     *
     * @private
     */
    _defineClassName() {
        var out = ['form-group'];

        if (this.state.displayValidationStatus) {
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
        }

        return out.join(' ');
    }

    /**
     * @returns {boolean}
     *
     * @private
     */
    _checkShouldWeDisplayErrors() {
        return this.state.displayValidationStatus && this.state.status === STATUS_ERROR && this.state.validationErrors.length > 0;
    }

    /**
     * @returns {XML|null}
     *
     * @private
     */
    _renderErrorList() {
        if (!this._checkShouldWeDisplayErrors()) {
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
     * @returns {Boolean}
     *
     * @private
     */
    _checkShouldWeDisplayStatusGlyphicon() {
        return this.state.status !== STATUS_PENDING && this.state.displayValidationStatus === true;
    }

    /**
     * @returns {XML|null}
     *
     * @private
     */
    _renderGlyphicon() {
        if (!this._checkShouldWeDisplayStatusGlyphicon()) {
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
