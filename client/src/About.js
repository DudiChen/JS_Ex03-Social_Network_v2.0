class MainHeader extends React.Component{

    constructor(props) {
        super(props);
      }

    render() 
    {
        return <header className="main-header">{this.props.children}</header>;
    }
}

class Card extends React.Component {
    
    constructor(props) 
    {
        super(props);
    }

    render() 
    {
        return (
            <div className={`card ${this.props.className}`} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}

class NavLinks extends React.Component {

    constructor(props) {
        super(props);

        this.open_homepage_handler = this.open_homepage_handler.bind(this);
        this.open_messages_handler = this.open_messages_handler.bind(this);
        this.open_about_handler = this.open_about_handler.bind(this);

    }

    open_homepage_handler() {
        window.location.href = "homepage.html"
    }

    open_messages_handler() {
        window.location.href = "messages.html"
    }

    open_about_handler() {
        window.location.href = "about.html"
    }

    render() 
    {
        return (
            <ul className="nav-links">
                <li>
                    <Button type='link' onClick={this.open_homepage_handler}>Homepage</Button>
                </li>
                <li>
                    <Button type='link' onClick={this.open_messages_handler}>Messages</Button>
                </li>
                <li>
                    <Button type='link' onClick={this.open_about_handler}>About</Button>
                </li>
            </ul>
        )
    }

}

class Button extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() 
    {
        if (this.props.href) {
            return (
              <a
                className={`button button--${this.props.size || 'default'} ${this.props.inverse &&
                  'button--inverse'} ${this.props.danger && 'button--danger'}`}
                href={this.props.href}
              >
                {this.props.children}
              </a>
            );
          }
        //   if (props.to) {
        //     return (
        //       <Link
        //         to={props.to}
        //         exact={props.exact}
        //         className={`button button--${props.size || 'default'} ${props.inverse &&
        //           'button--inverse'} ${props.danger && 'button--danger'}`}
        //       >
        //         {props.children}
        //       </Link>
        //     );
        //   }
          return (
            <button
              className={`button button--${this.props.size || 'default'} ${this.props.inverse &&
                'button--inverse'} ${this.props.danger && 'button--danger'}`}
              type={this.props.type}
              onClick={this.props.onClick}
              disabled={this.props.disabled}
            >
              {this.props.children}
            </button>
          );
    }
}

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

class About extends React.Component{

    render() 
    {
        return (
        <div>
            <header className="main-header">
                <button
                    className="main-navigation__menu-btn"
                >
                <span />
                <span />
                <span />
                </button>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </header>
            <h1>About</h1>
            </div>
        )
    }
}