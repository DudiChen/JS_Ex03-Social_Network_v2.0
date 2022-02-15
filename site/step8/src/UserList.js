
class UserItem extends React.Component {
  constructor(props) {
    super(props);
	this.handle_click = this.handle_click.bind( this );
  }
  
  handle_click()
  {
	  if ( this.props.handle_delete )
		  this.props.handle_delete( this.props.user.id );
  }
  
  render() {
    return 	<div className='UserItem'  data-id={this.props.user.id}>
				<span><i onClick={this.handle_click} className='fa fa-times transparent'></i></span>
				<span>{this.props.user.name}</span>
			</div>
  }
}


// Initial user list
const g_users = [
	{name:'Admin', id:0 },
	{name:'John', id:1 },
	{name:'Paul', id:2 },
	{name:'George', id:3 },	
	{name:'Ringo', id:4 },	
]

class UserList extends React.Component {
  constructor(props) {
    super(props);
	this.handle_delete = this.handle_delete.bind( this );
	this.state = {users: []}
  }
  
  componentDidMount() 
  {
	this.update_list( g_users );
  }

  componentWillUnmount() 
  {
  }
  
  handle_delete( id )
  {
	const current_users = this.state.users;
	const new_users = current_users.filter( user => user.id != id );
	this.update_list( new_users );
  }
  
  
  update_list( users )
  {
	this.setState( {users : users} );
  }

  render() {
		return <div>
			   {this.state.users.map( (item,index) => { return  <UserItem handle_delete={this.handle_delete} user={item}  key={index}/>  }  ) }
			   </div>
  }
}
