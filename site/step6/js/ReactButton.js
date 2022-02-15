
class ReactButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      'button',
      null,
      'Hello ',
      this.props.name ? this.props.name : 'No idea'
    );
  }
}