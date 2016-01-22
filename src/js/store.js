import * as redux from 'redux';
import reducers from './reducers';
import createLogger from 'redux-logger';
import thunkMiddelware from 'redux-thunk';

var loggerMiddelware = createLogger();

var storeWithMiddelwareFactory = redux.applyMiddleware(
    thunkMiddelware,
    loggerMiddelware
)(redux.createStore);

var store = storeWithMiddelwareFactory(reducers);

export default store;
