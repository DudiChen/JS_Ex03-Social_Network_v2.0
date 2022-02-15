class NavLinks extends React.Component{

    constructor(props) {
        super(props);
    }

    render() 
    {
        return (
            <ul className="nav-links">
                <li>
                    <button type='link'>Homepage</button>
                </li>
                <li>
                    <button type='link'>Messages</button>
                </li>
                <li>
                    <button type='link'>Register</button>
                </li>
            </ul>
        )
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

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

class Homapage extends React.Component{

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
                <h1>Main Page</h1>
                
                <Card className="card authentication">
                    <form onSubmit={this.handle_submit}>

                    </form>
                </Card>
            </div>
        )
    }
}
