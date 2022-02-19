class MainHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "header",
            { className: "main-header" },
            this.props.children
        );
    }
}