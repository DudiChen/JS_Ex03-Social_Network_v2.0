class NavLinks extends React.Component {

    constructor(props) {
        super(props);

        this.open_login_handler = this.open_login_handler.bind(this);
        this.open_register_handler = this.open_register_handler.bind(this);
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

    render() {
        return React.createElement(
            "ul",
            { className: "nav-links" },
            React.createElement(
                "li",
                null,
                React.createElement(
                    Button,
                    { type: "link", onClick: this.open_login_handler },
                    "Login"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    Button,
                    { type: "link", onClick: this.open_register_handler },
                    "Register"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    Button,
                    { type: "link", onClick: this.open_about_handler },
                    "About"
                )
            )
        );
    }
}