
class ReactButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button>Hello {this.props.name ? this.props.name : 'No idea' }</button>
  }
}
