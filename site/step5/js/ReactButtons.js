
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

class ReactButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(ReactButton, { name: 'Button 1' }),
      React.createElement(ReactButton, { name: 'Button 2' }),
      React.createElement(ReactButton, { name: 'Button 3' })
    );
  }
}