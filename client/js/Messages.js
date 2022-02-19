class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            to: '',
            all_messages: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
        this.fetch_messages = this.fetch_messages.bind(this);
    }

    handleInputChange(event, name, value) {
        const target = event.target;
        this.setState({
            [name]: value
        });
    }

    async fetch_messages() {
        const response = await fetch('http://localhost:2718/api/message/get_all_messages', {
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
        let messages = await this.fetch_messages();
        this.setState({
            ["all_messages"]: messages
        });
    }

    async handle_submit(event) {
        event.preventDefault();

        const to = this.state.to;
        const text = this.state.text;

        const response = await fetch('http://localhost:2718/api/message/send_message', {
            method: 'POST',
            body: JSON.stringify({
                text: text,
                to: to,
                send_all: "false"
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie("token")}`
            }
        });

        if (response.status == 200) {
            const responseJson = await response.json();
            alert("message sent!");
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
                            element: 'input',
                            type: 'text',
                            name: 'to',
                            value: this.state.to,
                            label: 'Recipient email',
                            onChange: this.handleInputChange }),
                        React.createElement(Input, {
                            element: 'textarea',
                            type: 'text',
                            name: 'text',
                            value: this.state.text,
                            label: 'Message content',
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
                this.state.all_messages.map(post => React.createElement(
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