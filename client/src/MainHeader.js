class MainHeader extends React.Component{

    constructor(props) {
        super(props);
      }

    render() 
    {
        return <header className="main-header">{this.props.children}</header>;
    }
}