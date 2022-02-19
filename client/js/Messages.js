class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
    }

    handleInputChange(event, name, value) {
        const target = event.target;
        this.setState({
            [name]: value
        });
    }

    async fetch_posts() {
        const email = "admin@gmail.com";

        const response = await fetch('http://localhost:2718/api/post/user_posts', {
            method: 'POST',
            body: JSON.stringify({
                email: email
            }),
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
        const posts = await this.fetch_posts();
        //this.update_list(users);
    }

    async handle_submit(event) {
        event.preventDefault();

        const username = this.state.username;
        const password = this.state.password;

        const response = await fetch('http://localhost:2718/api/users/send_message', {
            method: 'POST',
            body: JSON.stringify({
                text: username,
                to: password,
                send_all: false
            }),
            headers: {
                'Content-Type': 'application/json'

            }
        });

        if (response.status == 200) {
            const responseJson = await response.json();
            setCookie("token", responseJson.token, 3);
        }
    }

    render() {

        const MESSAGES_STUB = [{
            id: 1,
            email: "alex@gmail.com",
            text: "first post"
        }, {
            id: 2,
            email: "alex@gmail.com",
            text: "second post"
        }, {
            id: 3,
            email: "alex@gmail.com",
            text: "Smoked two joints in the morning"
        }, {
            id: 4,
            email: "dudi@gmail.com",
            text: "Smoked two joints at night"
        }, {
            id: 5,
            email: "dudi@gmail.com",
            text: "Fresh pasta 50 cents. BUY NOW?!@#!@$!@"
        }, {
            id: 6,
            email: "africa@gmail.com",
            text: "KISS KISS"
        }];

        return React.createElement(
            'div',
            null,
            React.createElement(
                'header',
                { className: 'main-header' },
                React.createElement(
                    'button',
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
                    React.createElement(NavLinks, { isLoggedIn: true })
                )
            ),
            React.createElement(
                'div',
                { className: 'messages' },
                React.createElement(
                    'h2',
                    null,
                    'Send a message'
                ),
                React.createElement(
                    Card,
                    { className: 'message-form' },
                    React.createElement(
                        'form',
                        { onSubmit: this.handle_submit },
                        React.createElement(Input, {
                            element: 'textarea',
                            type: 'text',
                            name: 'text',
                            value: this.state.text,
                            label: 'Add your post here',
                            onChange: this.handleInputChange }),
                        React.createElement(
                            Button,
                            { className: 'login_button', type: 'submit' },
                            'SUBMIT'
                        )
                    )
                ),
                React.createElement(
                    'h2',
                    null,
                    'Your messages'
                ),
                MESSAGES_STUB.map(post => React.createElement(
                    Card,
                    { className: 'place-form' },
                    React.createElement(
                        'h3',
                        null,
                        post.email
                    ),
                    React.createElement(
                        'p',
                        null,
                        post.text
                    )
                ))
            )
        );
    }
}