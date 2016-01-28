import React from 'react';
import FormElementComponent from './formElementComponent';
import { generateFormElementId } from './../helper/identifierHelper';
import _ from 'lodash';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormSubmitComponent extends FormElementComponent {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = _.extend({}, this.state, {
            isDisabled: this.props.isDisabled
        });
    }

    /**
     * @public
     */
    disable() {
        this.setState({
            isDisabled: true
        });
    }

    /**
     * @public
     */
    enable() {
        this.setState({
            isDisabled: false
        })
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <button type="submit"
                    id={generateFormElementId(this.props.identifier)}
                    name={this.props.identifier}
                    className={this.props.className}
                    disabled={this.state.isDisabled}>
                {this.props.children}
            </button>
        );
    }
}

FormSubmitComponent.defaultProps = _.extend({}, FormElementComponent.defaultProps, {
    className: 'btn btn-success',
    isDisabled: false
});

FormSubmitComponent.propTypes = _.extend({}, FormElementComponent.propTypes, {
    identifier: React.PropTypes.string.isRequired,
    className: React.PropTypes.string.isRequired,
    isDisabled: React.PropTypes.bool.isRequired
});

export default FormSubmitComponent;
