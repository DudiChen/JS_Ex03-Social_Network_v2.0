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

class Messages extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
    }

    handleInputChange(event, name, value) 
    {
        const target = event.target;
        this.setState({
            [name]: value
        });
    }

    async fetch_posts() {
        const email = "admin@gmail.com";
        
		const response = await fetch('http://localhost:2718/api/post/user_posts' , 
							{
                                method:'POST', 
							    body: JSON.stringify({
                                    email: email,
                                }), 
						        headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${getCookie("token")}`
                                    }
                            });
                             
		if ( response.status == 200 )
		{
            const responseJson = await response.json();   
            return responseJson;
		}

        return [];
    }

    async componentDidMount() 
	{
		const posts = await this.fetch_posts();
		//this.update_list(users);
	}

    async handle_submit(event)
	{
        event.preventDefault();

		const username = this.state.username;
        const password = this.state.password;
        
		const response = await fetch('http://localhost:2718/api/users/send_message' , 
							{
                                method:'POST', 
							    body: JSON.stringify({
                                    text: username,
                                    to: password,
                                    send_all: false
                                }), 
						        headers: {
                                     'Content-Type': 'application/json',

                                    }
                            });
                             
		if ( response.status == 200 )
		{
            const responseJson = await response.json();   
            setCookie("token", responseJson.token, 3);
		}
	}

    render() 
    {

        const MESSAGES_STUB = [
            {
                id: 1,
                email: "alex@gmail.com",
                text: "first post"
            },
            {
                id: 2,
                email: "alex@gmail.com",
                text: "second post"
            },
            {
                id: 3,
                email: "alex@gmail.com",
                text: "Smoked two joints in the morning"
            },
            {
                id: 4,
                email: "dudi@gmail.com",
                text: "Smoked two joints at night"
            },
            {
                id: 5,
                email: "dudi@gmail.com",
                text: "Fresh pasta 50 cents. BUY NOW?!@#!@$!@"
            },
            {
                id: 6,
                email: "africa@gmail.com",
                text: "KISS KISS"
            },
        ]

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
                <div className="messages">
                    <h2>Send a message</h2>
                    <Card className="message-form">
                        <form onSubmit={this.handle_submit}>
                            <Input 
                                element='textarea' 
                                type='text' 
                                name='text' 
                                value={this.state.text} 
                                label='Add your post here' 
                                onChange={this.handleInputChange}>
                            </Input>
                            <Button className='login_button' type="submit">SUBMIT</Button>
                        </form>
                    </Card>
                    <h2>Your messages</h2>
                    {MESSAGES_STUB.map(post => (
                        <Card className="place-form">
                            <h3>{post.email}</h3>
                            <p>{post.text}</p>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }
}