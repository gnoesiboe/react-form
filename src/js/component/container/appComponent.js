import React from 'react';
import * as reactRedux from 'react-redux';
import * as actionFactory from '../../actions/actionFactory';
import * as stateNamespace from './../../stateNamespace';
import FormComponent from './../../lib/form/component/formComponent';
import FormInputComponent from './../../lib/form/component/formInputComponent';
import FormLabelComponent from './../../lib/form/component/formLabelComponent';
import FormGroupComponent from './../../lib/form/component/formGroupComponent';
import FormTextareaComponent from './../../lib/form/component/formTextareaComponent';
import ValidatorCollection from './../../lib/validator/collection/validatorCollection';
import NotBlankValidator from './../../lib/validator/validator/notBlank';
import LengthValidator from './../../lib/validator/validator/length';

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
     * @inheritDoc
     *
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
                                <FormInputComponent identifier="first-name"
                                                    validators={ new ValidatorCollection([new NotBlankValidator(), new LengthValidator(3, 5)]) } />
                            </FormGroupComponent>
                        </div>

                        <div className="col-sm-6">
                            <FormGroupComponent>
                                <FormLabelComponent identifier="last-name">Last name</FormLabelComponent>
                                <FormInputComponent identifier="last-name"
                                                    validators={ new ValidatorCollection([new NotBlankValidator()]) } />
                            </FormGroupComponent>
                        </div>

                        <div className="col-sm-12">
                            <FormGroupComponent>
                                <FormLabelComponent identifier="description">Description</FormLabelComponent>
                                <FormTextareaComponent identifier="description"
                                                       validators={ new ValidatorCollection([new NotBlankValidator()]) } />
                            </FormGroupComponent>
                        </div>

                        <div className="col-sm-12">
                            <FormGroupComponent>
                                <FormLabelComponent identifier="website">Website</FormLabelComponent>
                                <FormInputComponent identifier="website"
                                                    value="http://"
                                                    validators={ new ValidatorCollection([new NotBlankValidator()]) } />
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
