class Register extends React.Component{

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
                <Card className="authentication">
                    <form className="login_form" onSubmit={this.handle_submit}>
                        <h1>Register Form</h1>
                        <div>
                            <Input 
                                element='input' 
                                type='text' 
                                name='email' 
                                value={this.state.email} 
                                label='Email' 
                                onChange={this.handleInputChange}>
                            </Input>
                        </div>
                        <span />
                        <span />
                        <span />
                        <div>
                            <Input element='input' type='text' name='password' value={this.state.password} label='Password' onChange={this.handleInputChange}></Input> 
                        </div>
                        <span />
                        <span />
                        <span />                      
                        <Button className='login_button' type="submit">JOIN REQUEST</Button>
                    </form>
                </Card>
            </div>
        )
    }
}