class NavLinks extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            'ul',
            { className: 'nav-links' },
            React.createElement(
                'li',
                null,
                React.createElement(
                    'button',
                    { type: 'link' },
                    'Homepage'
                )
            ),
            React.createElement(
                'li',
                null,
                React.createElement(
                    'button',
                    { type: 'link' },
                    'Messages'
                )
            ),
            React.createElement(
                'li',
                null,
                React.createElement(
                    'button',
                    { type: 'link' },
                    'Register'
                )
            )
        );
    }

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

class Homapage extends React.Component {

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
                    React.createElement(NavLinks, null)
                )
            ),
            React.createElement(
                'h1',
                null,
                'Main Page'
            ),
            React.createElement(
                'div',
                { className: 'card authentication', onSubmit: this.handle_submit },
                React.createElement('form', null)
            )
        );
    }
}