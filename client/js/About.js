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