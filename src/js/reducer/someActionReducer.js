import * as actionTypes from './../actions/actionTypes';
import Collection from './../collection';
import deepFreeze from 'deep-freeze-strict';

/**
 * @type {Collection}
 */
var _defaultState = new Collection();

/**
 * @param {Collection} currentState
 * @param {Object} action
 *
 * @return {Collection}
 *
 * @private
 */
var _handleSomeAction = function (currentState, action) {
    var newState = currentState.clone();

    return newState.add(Date.now());
};

/**
 * @param {Collection} currentState
 * @param {Object} action
 *
 * @returns {Collection}
 */
export default function someActionReducer(currentState = _defaultState, action) {

    // ensure that current state and action are not mutated!
    deepFreeze(currentState);
    deepFreeze(action);

    switch (action.type) {
        case actionTypes.SOME_ACTION:
            return _handleSomeAction(currentState, action);
            break;

        default:
            return currentState;
    }
};
