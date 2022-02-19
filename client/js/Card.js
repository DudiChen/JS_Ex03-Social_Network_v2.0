class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "div",
            { className: `card ${this.props.className}`, style: this.props.style },
            this.props.children
        );
    }
}

export { Card };