import React from 'react';
import _ from 'lodash';
import FormElementComponent from './../component/formElementComponent';

/**
 * @param {React.Component} component
 *
 * @returns {boolean}
 *
 * @private
 */
export function checkIsFormElement(component) {
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
 * @param {React.Component} component
 *
 * @returns {boolean}
 *
 * @private
 */
export function checkComponentHasChildren(component) {
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
 * @param {Function} callback
 */
export function forEachFormElementChild(children, callback) {
    React.Children.forEach(children, child => {
        if (typeof child.type !== 'undefined' && _.isFunction(child.type) && checkIsFormElement(child.type)) {
            callback(child);
        }

        if (checkComponentHasChildren(child)) {
            forEachFormElementChild(child.props.children, callback);
        }
    });
}

/**
 * @param {Array} children
 * @param {Function} callback
 *
 * @returns {Array}
 */
export function cloneChildFormElements(children, callback) {
    return React.Children.map(children, child => {
        if (typeof child.type !== 'undefined' && _.isFunction(child.type) && checkIsFormElement(child.type)) {
            child = callback(child);
        }

        if (checkComponentHasChildren(child)) {
            child = React.cloneElement(child, {
                children: cloneChildFormElements(child.props.children, callback)
            });
        }

        return child;
    });
}

/**
 * Takes two event listeners and wraps them into a one new event listener that calls both other
 * event listeners.
 *
 * @param {Function} currentEventListener
 * @param {Function} additionalEventListener
 *
 * @returns {Object}
 */
export function wrapEventListener(currentEventListener, additionalEventListener) {
    return function () {

        // suply null to context to remain the original context of the listener
        currentEventListener.apply(null, arguments);
        additionalEventListener.apply(null, arguments);
    };
}

/**
 * @param {Array} children
 *
 * @returns {Object}
 */
export function extractValuesFromChildFormElements(children) {
    if (React.Children.count(children) === 0) {
        return {};
    }

    var out = {};

    children.forEach(child => {
        if (typeof child.type !== 'undefined' && _.isFunction(child.type)) {
            if (checkIsFormElement(child.type)) {
                out[child.props.identifier] = child.props.value;
            }
        }

        if (checkComponentHasChildren(child)) {
            out = _.extend(out, extractValuesFromChildFormElements(child.props.children));
        }
    });

    return out;
}
