const express = require('express');
const package = require('../package.json');
const users = require('./src/users.js');
const message = require('./src/message.js');
const post = require('./src/post.js');
const auth = require("./middleware/auth");
const api_content = require('./middleware/api_content');
const client_content = require('./middleware/client_content')
const database = require('./config/database');
const { route } = require('express/lib/router');
const path = require("path");

const app = express()
let  port = 2718;

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
const client_router = express.Router();

database.read_all_database();

//functionality
router.get('/version', (req, res) => { get_version(req, res )  } );

router.post("/welcome", (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

router.post('/users/register', api_content, (req, res) => { users.register(req, res )  } ); //
router.post('/users/login', api_content, (req, res) => { users.login(req, res )  } ); //
router.delete('/users/logout', auth, api_content, (req, res) => { users.logout(req, res)  } );
router.get('/users/get_all_users', auth, api_content, (req, res) => { users.get_all_users(req, res )  } );//
router.put('/users/change_user_status', auth, api_content, (req, res) => { users.change_user_status(req, res)});
router.put('/users/get_user_latest_post', auth, api_content, (req, res) => { users.get_user_latest_post(req, res)});
router.get('/users/get_all_created_users', auth, api_content, (req, res) => { users.get_all_created_users(req, res )  } );//

router.post('/message/send_message', auth, api_content, (req, res) => { message.send_message(req, res )  } );//
router.get('/message/get_all_messages', auth, api_content, (req, res) => { message.get_all_user_messages(req, res )  } );//
router.get('/message/check_for_new_messages', auth, api_content, (req, res) => { message.check_for_new_messages(req, res )  } ); //)

router.get('/post/get_all_posts', auth, api_content, (req, res) => { post.get_all_posts(req, res )  } );//
router.post('/post/user_posts', api_content, (req, res) => { post.find_user_posts(req, res) } ); //
router.post('/post/send_post', auth, api_content, (req, res) => { post.create_post(req, res )  } ); //
router.post('/post/check_for_new_posts', auth, api_content, (req, res) => { post.check_for_new_posts(req, res )  } ); //)
router.delete('/post/delete_post', auth, api_content, (req, res) => { post.delete_post(req, res )  } );//
router.delete('/post/delete_post_admin', auth, api_content, (req, res) => { post.delete_post_admin(req, res )  } );//


const set_headers = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
	  'Access-Control-Allow-Headers',
	  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	res.setHeader('Content-Security-Policy', 'img-src \'self\'');	
	next();
  };

app.use(set_headers);

app.use(express.static(path.join(__dirname , '../client')));

client_router.get('/', client_content, (req, res) => {
	res.setHeader("Content-Type", "text/html");
	res.render(path.join(__dirname, '../client/index.html'))
});

app.use('/api', router);
app.use('', client_router);

//init
let msg = `${package.description} listening at port ${port}`
app.listen(port, () => { console.log( msg ) ; })
