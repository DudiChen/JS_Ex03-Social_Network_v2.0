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

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            all_posts: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
        this.submit_new_post = this.submit_new_post.bind(this);
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

    async check_new_posts() {
        const latestDateTime = this.state.all_posts[0].creation_date;

		const response = await fetch('http://localhost:2718/api/post/check_for_new_posts' , 
							{
                                method:'POST',
                                body: JSON.stringify( {
                                    timestamp: latestDateTime,
                                }), 
						        headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${getCookie("token")}`
                                    }
                            });
                             
		if ( response.status == 200 )
		{
            alert("check success!")
		}
    }

    async submit_new_post(event) {

        event.preventDefault();
        
        const text = this.state.text;

		const response = await fetch('http://localhost:2718/api/post/send_post' , 
							{
                                method:'POST',
                                body: JSON.stringify( {
                                    text: text,
                                }), 
						        headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${getCookie("token")}`
                                    }
                            });
                             
		if ( response.status == 200 )
		{
            alert("post sent!")
		}
    }

    async componentDidMount(event) 
	{
		let posts = await this.fetch_posts();
        this.setState({
            ["all_posts"]: posts
        });
        // this.interval = setInterval(() => {
        //     this.check_new_posts(event);
        // }, 10000);
		//this.update_list(users);
	}

    async componentWillUnmount() {
        clearInterval(this.interval);
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
                        <NavLinks isLoggedIn/>
                    </nav>
                </header>
                <div className="posts">
                    <h2>Create new post</h2>
                    <Card className="place-form">
                        <form onSubmit={this.submit_new_post}>
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
                    <h2>Recent posts</h2>
                    {this.state.all_posts.map(post => (
                        <Card className="place-form">
                            {/* <h3>{post.email}</h3> */}
                            <h3>{"temp@email.com"}</h3>
                            <p>{post.text}</p>
                            <p>{post.creation_date}</p>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }
}
