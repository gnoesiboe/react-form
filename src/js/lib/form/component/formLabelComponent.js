import React from 'react';
import { generateFormElementId } from './../helper/identifierHelper';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormLabelComponent extends React.Component {

    /**
     * @returns {XML}
     */
    render() {
        return (
            <label htmlFor={generateFormElementId(this.props.identifier)}>
                {this.props.children}
            </label>
        );
    }
}

FormLabelComponent.propTypes = {
    identifier: React.PropTypes.string.isRequired
};

export default FormLabelComponent;
