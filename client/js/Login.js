function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

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

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'admin@gmail.com',
            password: '12345678'
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
        setCookie("isAdmin", false, 3);
        setCookie("isLoggedIn", false, 3);
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
            setCookie("isAdmin", false, 3);
            setCookie("isLoggedIn", true, 3);

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
                        className: "main-navigation__menu-btn",
                        img: true
                    },
                    React.createElement("img", { src: "img/icon.jpg" })
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
                        "Login Form"
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
                        "LOGIN"
                    )
                )
            )
        );
    }
}