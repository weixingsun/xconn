import React, {
  Component
} from 'react';

export default class FormModal extends Component {
  constructor (props) {
    super(props);
  }

  componentWillUnmount () {
    this.props.updateDisplayValue();
  }

  render () {
    return this.props.renderScene();
  }
}

FormModal.propTypes = {
  renderScene: React.PropTypes.func,
  updateDisplayValue: React.PropTypes.func
};
