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
            <label htmlFor={generateFormElementId(this.props.identifier)}
                   className={this.props.className}>
                {this.props.children}
            </label>
        );
    }
}

FormLabelComponent.defaultProps = {
    className: 'control-label'
};

FormLabelComponent.propTypes = {
    identifier: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
};

export default FormLabelComponent;
