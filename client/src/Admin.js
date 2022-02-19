class Admin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
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

    async componentDidMount() 
	{
		eraseCookie("token");
	}

    async fetch_users() {
        const email = "admin@gmail.com";
        
		const response = await fetch('http://localhost:2718/api/post/get_all_posts' , 
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
        const POSTS_STUB = [
            {
                id: 1,
                email: "alex@gmail.com",
                usrename: "first post"
            },
            {
                id: 2,
                email: "alex@gmail.com",
                usrename: "second post"
            },
            {
                id: 3,
                email: "alex@gmail.com",
                usrename: "Smoked two joints in the morning"
            },
            {
                id: 4,
                email: "dudi@gmail.com",
                usrename: "Smoked two joints at night"
            },
            {
                id: 5,
                email: "dudi@gmail.com",
                usrename: "Fresh pasta 50 cents. BUY NOW?!@#!@$!@"
            },
            {
                id: 6,
                email: "africa@gmail.com",
                usrename: "KISS KISS"
            },
        ]

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
                    {POSTS_STUB.map(post => (
                        <Card className="place-form">
                            {/* <h3>{post.email}</h3> */}
                            <h3>{post.email}</h3>
                            <h3>{post.usrename}</h3>
                            <Button className='approve-button' type="submit">APPROVE</Button>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }
}