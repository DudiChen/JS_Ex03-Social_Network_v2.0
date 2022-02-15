
class ReactButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button>Hello {this.props.name ? this.props.name : 'No idea' }</button>
  }
}


class ReactButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
		return <div>
		       <ReactButton name='Button 1'/>
			   <ReactButton name='Button 2'/>
			   <ReactButton name='Button 3'/>
			   </div>
  }
}
