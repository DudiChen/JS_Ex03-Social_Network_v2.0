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

        this.open_homepage_handler = this.open_homepage_handler.bind(this);
        this.open_messages_handler = this.open_messages_handler.bind(this);
        this.open_about_handler = this.open_about_handler.bind(this);
    }

    open_homepage_handler() {
        window.location.href = "homepage.html";
    }

    open_messages_handler() {
        window.location.href = "messages.html";
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
                    { type: "link", onClick: this.open_homepage_handler },
                    "Homepage"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    Button,
                    { type: "link", onClick: this.open_messages_handler },
                    "Messages"
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

class About extends React.Component {

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "header",
                { className: "main-header" },
                React.createElement(
                    "button",
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
                "h1",
                null,
                "About"
            )
        );
    }
}