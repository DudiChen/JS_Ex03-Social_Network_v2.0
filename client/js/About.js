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
                "div",
                { className: "about" },
                React.createElement(
                    "h1",
                    null,
                    "About"
                ),
                React.createElement(
                    "h2",
                    null,
                    "Work of art by:"
                ),
                React.createElement(
                    "h3",
                    null,
                    "Alex Lefonde 320774078"
                ),
                React.createElement(
                    "h4",
                    null,
                    "alexeyle@mta.ac.il"
                ),
                React.createElement(
                    "h3",
                    null,
                    "David Chen 300334034"
                ),
                React.createElement(
                    "h4",
                    null,
                    "davidch@mta.ac.il"
                ),
                React.createElement(
                    "p",
                    null,
                    "pst... admin - username: admin@gmail.com, password: 12345678"
                )
            )
        );
    }
}