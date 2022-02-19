class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            all_users: []
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

    async fetch_users() {
        const email = "admin@gmail.com";

        const response = await fetch('http://localhost:2718/api/users/get_all_users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie("token")}`
            }
        });

        if (response.status == 200) {
            const responseJson = await response.json();
            return responseJson;
        }

        return [];
    }

    async componentDidMount() {
        let users = await this.fetch_users();
        this.setState({
            ["all_users"]: users
        });
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
        const POSTS_STUB = [{
            id: 1,
            email: "alex@gmail.com",
            usrename: "first post"
        }, {
            id: 2,
            email: "alex@gmail.com",
            usrename: "second post"
        }, {
            id: 3,
            email: "alex@gmail.com",
            usrename: "Smoked two joints in the morning"
        }, {
            id: 4,
            email: "dudi@gmail.com",
            usrename: "Smoked two joints at night"
        }, {
            id: 5,
            email: "dudi@gmail.com",
            usrename: "Fresh pasta 50 cents. BUY NOW?!@#!@$!@"
        }, {
            id: 6,
            email: "africa@gmail.com",
            usrename: "KISS KISS"
        }];

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
                'div',
                { className: 'posts' },
                React.createElement(
                    'h2',
                    null,
                    'Pending users for approval'
                ),
                this.state.all_users.map(user => React.createElement(
                    Card,
                    { className: 'place-form' },
                    React.createElement(
                        'h3',
                        null,
                        user.email
                    ),
                    React.createElement(
                        'h3',
                        null,
                        user.full_name
                    ),
                    React.createElement(
                        Button,
                        { className: 'approve-button', type: 'submit' },
                        'APPROVE'
                    )
                ))
            )
        );
    }
}