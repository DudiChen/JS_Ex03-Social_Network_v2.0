class Admin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            all_users: [],
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
    }

    handleInputChange(event, name, value) 
    {
        const target = event.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;
        //alert(`target = ${target}, name = ${name}, value = ${value}`)
        this.setState({
            [name]: value
        });
    }

    async fetch_users() {
        const email = "admin@gmail.com";
        
		const response = await fetch('http://localhost:2718/api/users/get_all_users' , 
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
		let users = await this.fetch_users();
        this.setState({
            ["all_users"]: users
        });
	}

    async handle_submit(event)
	{
        event.preventDefault();

		const email = this.state.email;
        const password = this.state.password;

        alert( `email = ${email}` )
        
		const response = await fetch('http://localhost:2718/api/users/login' , 
							{
                                method:'POST', 
							    body: JSON.stringify( {
                                    email: email,
                                    password: password
                                }), 
						        headers: { 'Content-Type': 'application/json' }
                            });
                             
		if ( response.status == 200 )
		{
            const responseJson = await response.json();   
            setCookie("token", responseJson.token, 3);
            window.location.href = "homepage.html"
		}
		// else 
		// {
		//   const err = await response.text();
		//   alert( err );
		// }
	}

    render()
    {
        return (
            <div>
                <MainHeader>
                    <Button
                        className="main-navigation__menu-btn"
                    >
                    <span />
                    <span />
                    <span />
                    </Button>
                    <nav className="main-navigation__header-nav">
                        <NavLinks />
                    </nav>
                </MainHeader>
                <div className="posts">
                    <h2>Pending users for approval</h2>
                    {this.state.all_users.map(user => (
                        <Card className="place-form">
                            <h3>{user.email}</h3>
                            <h3>{user.full_name}</h3>
                            <Button className='approve-button' type="submit">APPROVE</Button>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }
}