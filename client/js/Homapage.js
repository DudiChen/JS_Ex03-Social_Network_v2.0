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

class Homapage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            all_posts: []
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

        const response = await fetch('http://localhost:2718/api/post/get_all_posts', {
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
        this.state.all_posts = await this.fetch_posts();
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

        const POSTS_STUB = [{
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
                { className: 'posts' },
                React.createElement(
                    'h2',
                    null,
                    'Create new post'
                ),
                React.createElement(
                    Card,
                    { className: 'place-form' },
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
                    'Recent posts'
                ),
                this.state.all_posts.map(post => React.createElement(
                    Card,
                    { className: 'place-form' },
                    React.createElement(
                        'h3',
                        null,
                        "temp@email.com"
                    ),
                    React.createElement(
                        'p',
                        null,
                        post.text
                    ),
                    React.createElement(
                        'p',
                        null,
                        post.creation_date
                    )
                ))
            )
        );
    }
}