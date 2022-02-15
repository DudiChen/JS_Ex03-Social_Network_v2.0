
class UserItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return 	<div className='UserItem'  data-id={this.props.user.id}>{this.props.user.name}</div>
  }
}


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
	this.state = {users: []}
  }
  
  componentDidMount() 
  {
	  this.update_list( g_users );
  }

  componentWillUnmount() 
  {
  }
  
  
  update_list( users )
  {
	  this.setState( {users : users} );
  }

  render() {
		return <div>
			   {this.state.users.map( item => { return  <UserItem user={item}/>  }  ) }
			   </div>
  }
}
