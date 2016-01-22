import * as redux from 'redux';
import someActionReducer from './reducer/someActionReducer';
import * as stateNamespace from './stateNamespace';

const reducers = redux.combineReducers({
    [stateNamespace.SOME_KEY]: someActionReducer
});

export default reducers;
