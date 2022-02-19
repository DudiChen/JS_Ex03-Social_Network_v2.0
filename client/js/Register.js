class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
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

    async handle_submit(event) {
        event.preventDefault();

        const full_name = this.state.full_name;
        const email = this.state.email;
        const password = this.state.password;

        const response = await fetch('http://localhost:2718/api/users/register', {
            method: 'POST',
            body: JSON.stringify({
                full_name: full_name,
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
            'div',
            null,
            React.createElement(
                MainHeader,
                null,
                React.createElement(
                    Button,
                    {
                        className: 'main-navigation__menu-btn'
                    },
                    React.createElement('span', null),
                    React.createElement('span', null),
                    React.createElement('span', null)
                ),
                React.createElement(
                    'nav',
                    { className: 'main-navigation__header-nav' },
                    React.createElement(NavLinks, null)
                )
            ),
            React.createElement(
                Card,
                { className: 'authentication' },
                React.createElement(
                    'form',
                    { className: 'login_form', onSubmit: this.handle_submit },
                    React.createElement(
                        'h1',
                        null,
                        'Register Form'
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(Input, {
                            element: 'input',
                            type: 'text',
                            name: 'full_name',
                            value: this.state.full_name,
                            label: 'Full name',
                            onChange: this.handleInputChange })
                    ),
                    React.createElement('span', null),
                    React.createElement('span', null),
                    React.createElement('span', null),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(Input, {
                            element: 'input',
                            type: 'text',
                            name: 'email',
                            value: this.state.email,
                            label: 'Email',
                            onChange: this.handleInputChange })
                    ),
                    React.createElement('span', null),
                    React.createElement('span', null),
                    React.createElement('span', null),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(Input, { element: 'input', type: 'text', name: 'password', value: this.state.password, label: 'Password', onChange: this.handleInputChange })
                    ),
                    React.createElement('span', null),
                    React.createElement('span', null),
                    React.createElement('span', null),
                    React.createElement(
                        Button,
                        { className: 'login_button', type: 'submit' },
                        'JOIN REQUEST'
                    )
                )
            )
        );
    }
}