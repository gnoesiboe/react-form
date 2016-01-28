import React from 'react';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class FormSubmitComponent extends React.Component {

    /**
     * @returns {XML}
     */
    render() {
        return (
            <button type="submit" className={this.props.className}>
                {this.props.children}
            </button>
        );
    }
}

FormSubmitComponent.defaultProps = {
    className: 'btn btn-success'
};

FormSubmitComponent.propTypes = {
    className: React.PropTypes.string.isRequired
};

export default FormSubmitComponent;
