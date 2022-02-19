class Input extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ["value"]: value
        });

        this.props.onChange(event, name, value);
    }

    async componentDidMount() {
        this.setState({
            ["value"]: this.props.value
        });
    }

    render() {
        const element = this.props.element === 'input' ? React.createElement('input', {
            name: this.props.name,
            type: this.props.type,
            placeholder: this.props.placeholder,
            onChange: this.handleInputChange
            // onBlur={touchHandler}
            , value: this.state.value
        }) : React.createElement('textarea', {
            name: this.props.name,
            rows: this.props.rows || 3,
            onChange: this.handleInputChange
            // onBlur={touchHandler}
            , value: this.state.value
        });

        return React.createElement(
            'div',
            { className: `form-control` },
            React.createElement(
                'label',
                { htmlFor: this.props.id },
                this.props.label
            ),
            element
        );
    }
}