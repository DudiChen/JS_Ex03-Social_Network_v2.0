class Button extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() 
    {
        if (this.props.href) {
            return (
              <a
                className={`button button--${this.props.size || 'default'} ${this.props.inverse &&
                  'button--inverse'} ${this.props.danger && 'button--danger'} 
                  ${this.props.img && 'button--img'}`}
                href={this.props.href}
              >
                {this.props.children}
              </a>
            );
          }
        //   if (props.to) {
        //     return (
        //       <Link
        //         to={props.to}
        //         exact={props.exact}
        //         className={`button button--${props.size || 'default'} ${props.inverse &&
        //           'button--inverse'} ${props.danger && 'button--danger'}`}
        //       >
        //         {props.children}
        //       </Link>
        //     );
        //   }
          return (
            <button
              className={`button button--${this.props.size || 'default'} 
              ${this.props.inverse && 'button--inverse'} 
              ${this.props.danger && 'button--danger'}
              ${this.props.img && 'button--img'}`}
              type={this.props.type}
              onClick={this.props.onClick}
              disabled={this.props.disabled}
            >
              {this.props.children}
            </button>
          );
    }
}