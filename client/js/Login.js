// class MainHeader extends React.Component{

//     constructor(props) {
//         super(props);
//       }

//     render() 
//     {
//         return <header className="main-header">{this.props.children}</header>;
//     }
// }

// class Card extends React.Component {

//     constructor(props) 
//     {
//         super(props);
//     }

//     render() 
//     {
//         return (
//             <div className={`card ${this.props.className}`} style={this.props.style}>
//                 {this.props.children}
//             </div>
//         );
//     }
// }

// class NavLinks extends React.Component {

//     constructor(props) {
//         super(props);

//         this.open_login_handler = this.open_login_handler.bind(this);
//         this.open_register_handler = this.open_register_handler.bind(this);
//     }

//     open_login_handler() {
//         window.location.href = "index.html"
//     }

//     open_register_handler() {
//         window.location.href = "register.html"
//     }

//     open_about_handler() {
//         window.location.href = "about.html"
//     }

//     render() 
//     {
//         return (
//             <ul className="nav-links">
//                 <li>
//                     <Button type='link' onClick={this.open_login_handler}>Login</Button>
//                 </li>
//                 <li>
//                     <Button type='link' onClick={this.open_register_handler}>Register</Button>
//                 </li>
//                 <li>
//                     <Button type='link' onClick={this.open_about_handler}>About</Button>
//                 </li>
//             </ul>
//         )
//     }
// }

// class Button extends React.Component {

//     constructor(props) {
//         super(props);
//     }

//     render() 
//     {
//         if (this.props.href) {
//             return (
//               <a
//                 className={`button button--${this.props.size || 'default'} ${this.props.inverse &&
//                   'button--inverse'} ${this.props.danger && 'button--danger'} 
//                   ${this.props.img && 'button--img'}`}
//                 href={this.props.href}
//               >
//                 {this.props.children}
//               </a>
//             );
//           }
//         //   if (props.to) {
//         //     return (
//         //       <Link
//         //         to={props.to}
//         //         exact={props.exact}
//         //         className={`button button--${props.size || 'default'} ${props.inverse &&
//         //           'button--inverse'} ${props.danger && 'button--danger'}`}
//         //       >
//         //         {props.children}
//         //       </Link>
//         //     );
//         //   }
//           return (
//             <button
//               className={`button button--${this.props.size || 'default'} 
//               ${this.props.inverse && 'button--inverse'} 
//               ${this.props.danger && 'button--danger'}
//               ${this.props.img && 'button--img'}`}
//               type={this.props.type}
//               onClick={this.props.onClick}
//               disabled={this.props.disabled}
//             >
//               {this.props.children}
//             </button>
//           );
//     }
// }

// class Input extends React.Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             value: '',
//         };

//         this.handleInputChange = this.handleInputChange.bind(this);
//     }

//     handleInputChange(event) 
//     {
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         const name = target.name;

//         this.setState({
//             ["value"]: value
//         });

//         this.props.onChange(event, name, value);
//     }

//     async componentDidMount() 
// 	{
// 		this.setState({
//             ["value"]: this.props.value
//         });
// 	}


//     render() 
//     {
//         const element =
//             this.props.element === 'input' ? (
//             <input
//                 name={this.props.name}
//                 type={this.props.type}
//                 placeholder={this.props.placeholder}
//                 onChange={this.handleInputChange}
//                 // onBlur={touchHandler}
//                 value={this.state.value}
//             />
//         ) : (
//             <textarea
//                 name={this.props.name}
//                 rows={this.props.rows || 3}
//                 onChange={this.handleInputChange}
//                 // onBlur={touchHandler}
//                 value={this.state.value}
//             />
//         );

//         return (
//             <div className={`form-control`}>
//             {/* <div     className={`form-control ${!inputState.isValid && inputState.isTouched &&
//                      'form-control--invalid'}`}
//                 > */}
//                 <label htmlFor={this.props.id}>{this.props.label}</label>
//                     {element}
//                     {/* {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>} */}
//             </div>
//         );
//     }
// }

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
        const script = document.createElement("script");
        script.src = "../js/Card.js";
        script.async = true;
        document.body.appendChild(script);
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