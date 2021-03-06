
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

class NavLinks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false,
            isLoggedIn: false
        };

        this.open_login_handler = this.open_login_handler.bind(this);
        this.open_register_handler = this.open_register_handler.bind(this);
        this.open_about_handler = this.open_about_handler.bind(this);
        this.open_homepage_handler = this.open_homepage_handler.bind(this);
        this.open_messages_handler = this.open_messages_handler.bind(this);
        this.open_admin_handler = this.open_admin_handler.bind(this);
    }

    open_login_handler() {
        window.location.href = "index.html";
    }

    open_register_handler() {
        window.location.href = "register.html";
    }

    open_about_handler() {
        window.location.href = "about.html";
    }

    open_homepage_handler() {
        window.location.href = "homepage.html";
    }

    open_messages_handler() {
        window.location.href = "messages.html";
    }

    open_admin_handler() {
        window.location.href = "admin.html";
    }

    // async componentDidMount() 
    // {
    // 	this.state.isAdmin = getCookie("isAdmin");
    //     this.state.isLoggedIn = getCookie("isLoggedIn");
    // }

    render() {
        return React.createElement(
            'ul',
            { className: 'nav-links' },
            !this.props.isLoggedIn && React.createElement(
                'li',
                null,
                React.createElement(
                    Button,
                    { type: 'link', onClick: this.open_login_handler },
                    'Login'
                )
            ),
            !this.props.isLoggedIn && React.createElement(
                'li',
                null,
                React.createElement(
                    Button,
                    { type: 'link', onClick: this.open_register_handler },
                    'Register'
                )
            ),
            this.props.isLoggedIn && React.createElement(
                'li',
                null,
                React.createElement(
                    Button,
                    { type: 'link', onClick: this.open_homepage_handler },
                    'Homepage'
                )
            ),
            this.props.isLoggedIn && React.createElement(
                'li',
                null,
                React.createElement(
                    Button,
                    { type: 'link', onClick: this.open_messages_handler },
                    'Messages'
                )
            ),
            React.createElement(
                'li',
                null,
                React.createElement(
                    Button,
                    { type: 'link', onClick: this.open_about_handler },
                    'About'
                )
            ),
            React.createElement(
                'li',
                null,
                React.createElement(
                    Button,
                    { type: 'link', onClick: this.open_admin_handler },
                    'Admin'
                )
            )
        );
    }
}