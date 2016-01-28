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
            <button type="submit"
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
    className: React.PropTypes.string.isRequired,
    isDisabled: React.PropTypes.bool.isRequired
};

export default FormSubmitComponent;
