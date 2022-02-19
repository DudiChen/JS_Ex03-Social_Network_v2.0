class About extends React.Component{

    render() 
    {
        return (
        <div>
            <header className="main-header">
                <button
                    className="main-navigation__menu-btn"
                >
                <span />
                <span />
                <span />
                </button>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </header>
            <div className="about">
                <h1>About</h1>
                <h2>Work of art by:</h2>
                <h3>Alex Lefonde 320774078</h3>
                <h4>alexeyle@mta.ac.il</h4>
                <h3>David Chen 300334034</h3>
                <h4>davidch@mta.ac.il</h4>
                <p>pst... admin - username: admin@gmail.com, password: 12345678</p>
            </div>
            </div>
        )
    }
}