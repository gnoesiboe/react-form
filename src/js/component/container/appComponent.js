import React from 'react';
import * as reactRedux from 'react-redux';
import * as actionFactory from '../../actions/actionFactory';
import * as stateNamespace from './../../stateNamespace';
import FormComponent from './../../lib/form/component/formComponent';
import FormInputComponent from './../../lib/form/component/formInputComponent';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class AppComponent extends React.Component {

    /**
     * @param {Object} event
     *
     * @private
     */
    _onClick(event) {
        event.preventDefault();

        this.props.dispatch(actionFactory.createSomeAction());
    }

    /**
     * @param {Object} newState
     *
     * @private
     */
    _onFormSubmit(newState) {
        console.log('form submitted: ', newState);
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <FormComponent onSubmit={this._onFormSubmit.bind(this)}>
                        <div className="form-group">
                            <div className="col-sm-6">
                                <label htmlFor="first-name-field">First name</label>
                                <FormInputComponent identifier="first-name" />
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="second-input-field">Second input</label>
                                <FormInputComponent identifier="second-input" />
                            </div>
                        </div>

                        <button type="submit">Submit</button>
                    </FormComponent>
                </div>
            </div>
        );
    }
}

/**
 * @param {Object} completeState
 *
 * @returns {Object}
 */
var mapCompleteStateToAppComponentProps = function (completeState) {
    return {
        [stateNamespace.SOME_KEY]: completeState.someKey
    }
};

export default reactRedux.connect(mapCompleteStateToAppComponentProps)(AppComponent);
