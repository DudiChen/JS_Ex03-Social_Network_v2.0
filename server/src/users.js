require('dotenv').config();
const database = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes').StatusCodes;
const saltRounds = 10;

function User(id, full_name, email, password, status){
    this.obj_id = id
    this.full_name = full_name;
    this.email = email;
    this.password = password;
    this.creation_date = new Date();
    this.status = status;
    this.posts = [];
    this.messages = [];
}

function register(request, response){

    const {full_name, email, password} = request.body;

    if(!full_name || !email || !password){
        response.status(StatusCodes.BAD_REQUEST);
        response.send('All inputs required!');
    }

    else if(database.match_email_to_user(email.toLowerCase()) !== null)
    {
        response.status(StatusCodes.CONFLICT);
        response.send("User Already Exist. Please Login");
    }
    else
    {
        bcrypt.hash(password, saltRounds, function(err, hash) {
              // Store hash in database here
            const new_user = new User(database.get_users_counter(), full_name, email.toLowerCase(), hash, "created")
            database.add_new_user(new_user);

                
            response.status(StatusCodes.CREATED);
            response.send("User as been created");
        });

    };
};


const login = (request, response) =>{
    const {email, password} = request.body;

    if (!(email && password)) {
        response.status(StatusCodes.BAD_REQUEST);
        response.send("All input is required");
    }

    const user = database.match_email_to_user(email.toLowerCase());
    if(user && (bcrypt.compare(password, user.password)))
    {
        if(user.status === 'active'){
            const user_to_jwt = { id:user.obj_id, name: email};
            const token = jwt.sign(user_to_jwt, process.env.ACCESS_TOKEN_SECRET,
                {
                expiresIn: "10m",
                }
            );

            database.add_validation_token(token);
            setTimeout(() => {
                database.remove_validation_token(token);
            }, 600000);
            response.status(StatusCodes.OK);
            response.send(JSON.stringify({token: token}));
        }else{
            response.status(StatusCodes.BAD_REQUEST);
            response.send("Your account has not yet been activated");
        }
    }
    else{
        response.status(StatusCodes.BAD_REQUEST);
        response.send("Invalid Credentials");
    }

};

const logout = (request, response) =>{
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        response.status(StatusCodes.BAD_REQUEST);
        response.send("token must be provide");
    }
    else{
        database.remove_validation_token(token);
        response.status(StatusCodes.OK);
        response.send(`Bye bye`);
    }
};

//function return json of all users array (if is admin authentication)
const get_all_users = (request, response) =>{

    if(request.user.id !== 1)
    {
        response.status(StatusCodes.UNAUTHORIZED);
        response.send('This user is unauthorized to see all users info');
    }
    else{
        response.send(JSON.stringify(database.get_all_users()));
    }
};


const get_all_created_users = (request, response) =>{

    if(request.user.id === 1)
    {
        response.status(StatusCodes.OK);
        response.send(JSON.stringify(database.get_all_created_users()));
    }
    else{
        response.status(StatusCodes.UNAUTHORIZED);
        response.send('User unauthorized to see user`s requests');
    }
};


const change_user_status = (request, response) =>{

    if(request.user.id === 1)
    {
        const new_status = request.body.status;
        if(new_status === 'active' || new_status === 'suspended' || new_status === 'deleted')
        {
            const user_to_change = database.match_email_to_user(request.body.email.toLowerCase());

            if(user_to_change !== null && user_to_change.obj_id !== 1 && user_to_change.status !== 'deleted')
            {
                user_to_change.status = new_status;
                database.write_all_users();
                response.send(`${user_to_change.full_name} status as been change to ${new_status}`);
            }
            else{
                response.status(StatusCodes.NOT_FOUND);
                response.send('invalid user email');
            }
        }
        else{
            response.status(StatusCodes.BAD_REQUEST);
            response.send('Invalid status');
        }
    }
    else{
        response.status(StatusCodes.UNAUTHORIZED);
        response.send('User unauthorized to change user`s status');
    }
};

const get_user_latest_post = (request, response) => {
    const email = request.user.name;
    if (!email) {
        const latest_post = database.get_all_user_posts(email);
        response.send(JSON.stringify(latest_post));
    }
    else {
        response.status(StatusCodes.BAD_REQUEST);
        response.send('Invalid status');
    }
};

module.exports = {logout, register, login, change_user_status, get_all_created_users, get_all_users, get_user_latest_post};
