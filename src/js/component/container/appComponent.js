import React from 'react';
import * as reactRedux from 'react-redux';
import * as actionFactory from '../../actions/actionFactory';
import * as stateNamespace from './../../stateNamespace';

import FormComponent from './../../lib/form/component/formComponent';
import FormInputComponent from './../../lib/form/component/formInputComponent';
import FormLabelComponent from './../../lib/form/component/formLabelComponent';
import FormGroupComponent from './../../lib/form/component/formGroupComponent';
import FormTextareaComponent from './../../lib/form/component/formTextareaComponent';
import FormSelectComponent from './../../lib/form/component/formSelectComponent';
import FormSubmitComponent from './../../lib/form/component/formSubmitComponent';
import FormCheckboxComponent from './../../lib/form/component/formCheckboxComponent';

import ValidatorCollection from './../../lib/validator/collection/validatorCollection';
import NotBlankValidator from './../../lib/validator/validator/notBlank';
import LengthValidator from './../../lib/validator/validator/length';
import IsValidator from './../../lib/validator/validator/is';

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
        var disciplineOptions = {
            '': '-- choose a discipline --',
            eerste: 'Eerste',
            tweede: 'Tweede',
            derde: {
                vierde: 'Vierde',
                vijfde: 'Vijfde'
            },
            zesde: 'Zesde'
        };

        return (
            <div className="row">
                <div className="col-xs-12">
                    <FormComponent onSubmit={this._onFormSubmit.bind(this)}>
                        <div className="col-sm-6">
                            <FormGroupComponent>
                                <FormLabelComponent identifier="first-name">First name</FormLabelComponent>
                                <FormInputComponent identifier="first-name"
                                                    validateOnChange={true}
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
                                <FormLabelComponent identifier="discipline">Discipline</FormLabelComponent>
                                <FormSelectComponent identifier="descipline"
                                                     options={disciplineOptions}
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

                        <div className="col-sm-12">
                            <FormGroupComponent
                                className="checkbox clearfix"
                                renderFeedbackGlyphicon={false}
                            >
                                <FormLabelComponent identifier="aggreed-to-terms">
                                    <FormCheckboxComponent
                                        identifier="aggreed-to-terms"
                                        validators={ new ValidatorCollection([new IsValidator(true, 'You need to aggree to the terms')]) }
                                    />
                                    Aggreed to terms
                                </FormLabelComponent>
                            </FormGroupComponent>
                        </div>

                        <div className="col-sm-12 text-right">
                            <FormSubmitComponent identifier="only-submit">
                                Submit
                            </FormSubmitComponent>
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
