class Input extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) 
    {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ["value"]: value
        });

        this.props.onChange(event, name, value);
    }

    async componentDidMount() 
	{
		this.setState({
            ["value"]: this.props.value
        });
	}
    

    render() 
    {
        const element =
            this.props.element === 'input' ? (
            <input
                name={this.props.name}
                type={this.props.type}
                placeholder={this.props.placeholder}
                onChange={this.handleInputChange}
                // onBlur={touchHandler}
                value={this.state.value}
            />
        ) : (
            <textarea
                name={this.props.name}
                rows={this.props.rows || 3}
                onChange={this.handleInputChange}
                // onBlur={touchHandler}
                value={this.state.value}
            />
        );

        return (
            <div className={`form-control`}>
            {/* <div     className={`form-control ${!inputState.isValid && inputState.isTouched &&
                     'form-control--invalid'}`}
                > */}
                <label htmlFor={this.props.id}>{this.props.label}</label>
                    {element}
                    {/* {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>} */}
            </div>
        );
    }
}