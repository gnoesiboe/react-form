import React from 'react';
import _ from 'lodash';
import FormElementComponent from './formElementComponent';
import FormInputComponent from './formInputComponent';

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

        this._childrenBlueprints = null;
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        var newValues = _.extend({}, this.state.values, this._extractInitialValues(this._childrenBlueprints));

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
    _onFieldChange(identifier, newValue) {
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

        this.setState(stateUpdates, () => {
            console.log('new values state:', this.state.values);
        });
    }

    /**
     * @param {React.Component} component
     *
     * @returns {boolean}
     *
     * @private
     */
    static _checkIsFormElement(component) {
        //@todo better solution?

        if (component === FormElementComponent) {
            return true;
        } else if (component.prototype instanceof FormElementComponent) {
            return true;
        } else if (component.prototype.prototype instanceof FormElementComponent) {
            return true;
        }

        return false;
    }

    /**
     * @param {*} component
     *
     * @return {Boolean}
     *
     * @private
     */
    static _checkComponentHasChildren(component) {
        if (typeof component.props === 'undefined') {
            return false;
        }

        if (typeof component.props.children === 'undefined') {
            return false;
        }

        if (React.Children.count(component.props.children) === 0) {
            return false;
        }

        return true;
    }

    /**
     * @param {Array} children
     *
     * @return {Object}
     *
     * @private
     */
    _extractInitialValues(children) {
        if (!_.isArray(children)) {
            return {};
        }

        var out = {};

        children.forEach(child => {
            if (typeof child.type !== 'undefinded' && _.isFunction(child.type)) {
                if (FormComponent._checkIsFormElement(child.type)) {
                    out[child.props.identifier] = child.props.value;
                }
            }

            if (FormComponent._checkComponentHasChildren(child)) {
                out = _.extend(out, this._extractInitialValues(child.props.children));
            }
        });

        return out;
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
    _augmentChildren(children) {
        var callback = this._onFieldChange.bind(this);

        return React.Children.map(children, child => {
            if (typeof child.type !== 'undefinded' && _.isFunction(child.type)) {
                if (FormComponent._checkIsFormElement(child.type)) {
                    child = React.cloneElement(child, {
                        onValueChange: callback
                    });
                }
            }

            if (FormComponent._checkComponentHasChildren(child)) {
                child = React.cloneElement(child, {
                    children: this._augmentChildren(child.props.children)
                });
            }

            return child;
        });
    }

    /**
     * @returns {XML}
     */
    render() {
        this._childrenBlueprints = this._augmentChildren(this.props.children);

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
