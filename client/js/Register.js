class MainHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "header",
            { className: "main-header" },
            this.props.children
        );
    }
}

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "div",
            { className: `card ${this.props.className}`, style: this.props.style },
            this.props.children
        );
    }
}

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

class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.href) {
            return React.createElement(
                "a",
                {
                    className: `button button--${this.props.size || 'default'} ${this.props.inverse && 'button--inverse'} ${this.props.danger && 'button--danger'}`,
                    href: this.props.href
                },
                this.props.children
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
        return React.createElement(
            "button",
            {
                className: `button button--${this.props.size || 'default'} ${this.props.inverse && 'button--inverse'} ${this.props.danger && 'button--danger'}`,
                type: this.props.type,
                onClick: this.props.onClick,
                disabled: this.props.disabled
            },
            this.props.children
        );
    }
}

class Input extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ["value"]: value
        });

        this.props.onChange(event, name, value);
    }

    async componentDidMount() {
        this.setState({
            ["value"]: this.props.value
        });
    }

    render() {
        const element = this.props.element === 'input' ? React.createElement("input", {
            name: this.props.name,
            type: this.props.type,
            placeholder: this.props.placeholder,
            onChange: this.handleInputChange
            // onBlur={touchHandler}
            , value: this.state.value
        }) : React.createElement("textarea", {
            name: this.props.name,
            rows: this.props.rows || 3,
            onChange: this.handleInputChange
            // onBlur={touchHandler}
            , value: this.state.value
        });

        return React.createElement(
            "div",
            { className: `form-control` },
            React.createElement(
                "label",
                { htmlFor: this.props.id },
                this.props.label
            ),
            element
        );
    }
}

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
    }

    handleInputChange(event, name, value) {
        const target = event.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;
        //alert(`target = ${target}, name = ${name}, value = ${value}`)
        this.setState({
            [name]: value
        });
    }

    async componentDidMount() {
        eraseCookie("token");
    }

    async handle_submit(event) {
        event.preventDefault();

        const email = this.state.email;
        const password = this.state.password;

        alert(`email = ${email}`);

        const response = await fetch('http://localhost:2718/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status == 200) {
            const responseJson = await response.json();
            setCookie("token", responseJson.token, 3);
            window.location.href = "homepage.html";
        }
        // else 
        // {
        //   const err = await response.text();
        //   alert( err );
        // }
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                MainHeader,
                null,
                React.createElement(
                    Button,
                    {
                        className: "main-navigation__menu-btn"
                    },
                    React.createElement("span", null),
                    React.createElement("span", null),
                    React.createElement("span", null)
                ),
                React.createElement(
                    "nav",
                    { className: "main-navigation__header-nav" },
                    React.createElement(NavLinks, null)
                )
            ),
            React.createElement(
                Card,
                { className: "authentication" },
                React.createElement(
                    "form",
                    { className: "login_form", onSubmit: this.handle_submit },
                    React.createElement(
                        "h1",
                        null,
                        "Register Form"
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(Input, {
                            element: "input",
                            type: "text",
                            name: "email",
                            value: this.state.email,
                            label: "Email",
                            onChange: this.handleInputChange })
                    ),
                    React.createElement("span", null),
                    React.createElement("span", null),
                    React.createElement("span", null),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(Input, { element: "input", type: "text", name: "password", value: this.state.password, label: "Password", onChange: this.handleInputChange })
                    ),
                    React.createElement("span", null),
                    React.createElement("span", null),
                    React.createElement("span", null),
                    React.createElement(
                        Button,
                        { className: "login_button", type: "submit" },
                        "JOIN REQUEST"
                    )
                )
            )
        );
    }
}