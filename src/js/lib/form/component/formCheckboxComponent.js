import React from 'react';
import _ from 'lodash';
import FormElementComponent from './formElementComponent';
import { generateFormElementId } from './../helper/identifierHelper';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormCheckboxComponent extends FormElementComponent {

    /**
     * @inheritDoc
     *
     * @protected
     */
    _onChange() {
        this.setState({
            value: !this.state.value,
        }, this._onChangeAppliedToInternalState.bind(this));
    }

    /**
     * @inheritDoc
     *
     * @returns {XML}
     */
    render() {
        console.log('render:', this.state.value);

        return (
            <input name={this.props.identifier}
                   type="checkbox"
                   id={ generateFormElementId(this.props.identifier) }
                   checked={this.state.value === true}
                   value={this.props.value}
                   onFocus={this._onFocus.bind(this)}
                   onBlur={this._onBlur.bind(this)}
                   onChange={this._onChange.bind(this)}
                   className="" />
        );
    }
}

FormCheckboxComponent.defaultProps = _.extend({}, FormElementComponent.defaultProps, {
    value: false
});

FormCheckboxComponent.propTypes = _.extend({}, FormElementComponent.propTypes, {
    value: React.PropTypes.bool.isRequired
});

export default FormCheckboxComponent;

