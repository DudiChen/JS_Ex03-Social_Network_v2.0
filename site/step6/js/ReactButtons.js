
class ReactButton extends React.Component {
  constructor(props) {
    super(props);

    this.handle_click = this.handle_click.bind(this); // Huhh??? This is important
    this.state = { visible: true };
  }

  handle_click() {
    const new_state = { visible: false };
    this.setState(new_state);
  }

  render() {
    return React.createElement(
      'button',
      { className: this.state.visible ? '' : 'hidden', onClick: this.handle_click },
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