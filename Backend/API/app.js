const express = require('express');
const package = require('./package.json');
const users = require('./src/users.js');
const message = require('./src/message.js');
const post = require('./src/post.js');
const auth = require("./middleware/auth");
const database = require('./config/database');
const { route } = require('express/lib/router');
const path = require("path");

const app = express()
let  port = 2718;

// General app settings
const set_content_type = function (req, res, next) 
{
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	next()
}

app.use( set_content_type );
app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded( // to support URL-encoded bodies
{  
  extended: true
}));

// Version 
function get_version(req, res) 
{
	const version_obj = { version: package.version, description: package.description };
	res.send(JSON.stringify( version_obj) );   
}

//Routing
const router = express.Router();

database.read_all_database();

//functionality
router.get('/version', (req, res) => { get_version(req, res )  } );

// app.get('/', function(request, response){
//     response.sendFile('C:\\Users\\alexl\\Documents\\JavaScript\\Assignment 3\\Backend\\API\\Frontend\\index.html');
// });

app.use('/Frontend', express.static(path.join(__dirname + '/Frontend')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/Frontend/index.html"));
});

router.post("/welcome", (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
//router.post('/users/register', (req,res) => {register(req,res)});
router.post('/users/register', (req, res) => { users.register(req, res )  } ); //
router.post('/users/login', (req, res) => { users.login(req, res )  } ); //
router.delete('/users/logout', auth, (req, res) => { users.logout(req, res)  } );
router.get('/users/get_all_users', auth, (req, res) => { users.get_all_users(req, res )  } );//
router.put('/users/change_user_status', auth, (req, res) => { users.change_user_status(req, res)});
router.put('/users/get_user_latest_post', auth, (req, res) => { users.get_user_latest_post(req, res)});
router.get('/users/get_all_created_users', auth, (req, res) => { users.get_all_created_users(req, res )  } );//
router.post('/message/send_message', auth, (req, res) => { message.send_message(req, res )  } );//
router.get('/post/get_all_posts', auth, (req, res) => { post.get_all_posts(req, res )  } );//
router.post('/post/user_posts', (req, res) => { post.find_user_posts(req, res) } ); //
router.post('/post/send_post', auth, (req, res) => { post.create_post(req, res )  } ); //
router.get('/post/check_for_new_posts', auth, (req, res) => { post.check_for_new_posts(req, res )  } ); //)
router.delete('/post/delete_post', auth, (req, res) => { post.delete_post(req, res )  } );//
router.delete('/post/delete_post_admin', auth, (req, res) => { post.delete_post_admin(req, res )  } );//




app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
	  'Access-Control-Allow-Headers',
	  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
	next();
  });

app.use('/api', router);

//init
let msg = `${package.description} listening at port ${port}`
app.listen(port, () => { console.log( msg ) ; })
