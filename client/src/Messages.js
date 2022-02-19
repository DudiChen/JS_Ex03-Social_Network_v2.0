class Messages extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            all_messages: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
        this.fetch_messages = this.fetch_messages.bind(this);
    }

    handleInputChange(event, name, value) 
    {
        const target = event.target;
        this.setState({
            [name]: value
        });
    }

    async fetch_messages() {
		const response = await fetch('http://localhost:2718/api/message/get_all_messages' , 
							{
                                method:'GET', 
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
		let messages = await this.fetch_messages();
        this.setState({
            ["all_messages"]: messages
        });
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
                        <NavLinks isLoggedIn/>
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
                    {this.state.all_messages.map(post => (
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