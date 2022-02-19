class NavLinks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            admin: false,
            registered: false
        };

        this.open_login_handler = this.open_login_handler.bind(this);
        this.open_register_handler = this.open_register_handler.bind(this);
    }

    open_login_handler() {
        window.location.href = "index.html"
    }

    open_register_handler() {
        window.location.href = "register.html"
    }

    open_about_handler() {
        window.location.href = "about.html"
    }

    render() 
    {
        return (
            <ul className="nav-links">
                <li>
                    <Button type='link' onClick={this.open_login_handler}>Login</Button>
                </li>
                <li>
                    <Button type='link' onClick={this.open_register_handler}>Register</Button>
                </li>
                <li>
                    <Button type='link' onClick={this.open_about_handler}>About</Button>
                </li>
            </ul>
        )
    }
}