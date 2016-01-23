import React from 'react';
import * as reactRedux from 'react-redux';
import * as actionFactory from '../../actions/actionFactory';
import * as stateNamespace from './../../stateNamespace';
import FormComponent from './../../lib/form/component/formComponent';
import FormInputComponent from './../../lib/form/component/formInputComponent';
import FormLabelComponent from './../../lib/form/component/formLabelComponent';
import FormGroupComponent from './../../lib/form/component/formGroupComponent';


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
                        <div className="col-sm-6">
                            <FormGroupComponent>
                                <FormLabelComponent identifier="first-name">First name</FormLabelComponent>
                                <FormInputComponent identifier="first-name" />
                            </FormGroupComponent>
                        </div>

                        <div className="col-sm-6">
                            <FormGroupComponent>
                                <FormLabelComponent identifier="last-name">Last name</FormLabelComponent>
                                <FormInputComponent identifier="last-name" />
                            </FormGroupComponent>
                        </div>

                        <div className="col-sm-12">
                            <FormGroupComponent>
                                <FormLabelComponent identifier="street">Street</FormLabelComponent>
                                <FormInputComponent identifier="street" />
                                <span className="glyphicon glyphicon-ok form-control-feedback" />
                            </FormGroupComponent>
                        </div>

                        <div className="col-sm-12">
                            <FormGroupComponent>
                                <FormLabelComponent identifier="website">Website</FormLabelComponent>
                                <FormInputComponent identifier="website" value="http://" />
                                <span className="glyphicon glyphicon-remove form-control-feedback" />

                                <span className="help-block">
                                    <ul className="list">
                                        <li>
                                            Vul de naam van uw organisatie in
                                        </li>
                                    </ul>
                                </span>
                            </FormGroupComponent>
                        </div>

                        <div className="col-sm-12 text-right">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
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
