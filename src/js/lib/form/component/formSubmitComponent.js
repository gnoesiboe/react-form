import React from 'react';
import { generateFormElementId } from './../helper/identifierHelper';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormSubmitComponent extends React.Component {

    /**
     * @returns {XML}
     */
    render() {
        return (
            <button type="submit"
                    id={generateFormElementId(this.props.identifier)}
                    name={this.props.identifier}
                    className={this.props.className}
                    disabled={this.props.isDisabled}>
                {this.props.children}
            </button>
        );
    }
}

FormSubmitComponent.defaultProps = {
    className: 'btn btn-success',
    isDisabled: false
};

FormSubmitComponent.propTypes = {
    identifier: React.PropTypes.string.isRequired,
    className: React.PropTypes.string.isRequired,
    isDisabled: React.PropTypes.bool.isRequired
};

export default FormSubmitComponent;
