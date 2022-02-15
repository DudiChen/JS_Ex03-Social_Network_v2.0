let users = [];
let validation_token = [];
const fs = require('fs').promises;

//suntion reads the users and tokens array from files that used a DB
async function read_all_database (){
    await fs.readFile('./config/users.json').then((data) =>{
        const users_from_file = (JSON.parse(data));
        users = [...users_from_file];
    }).catch((error) => {console.log("users file reading error");
    throw error;
    });

    await fs.readFile('./config/validationTokens.json').then((data) =>{
        const tokens_from_file = (JSON.parse(data));
        validation_token = [...tokens_from_file];
    }).catch((error) => {console.log("tokens file reading error");
    throw error;
    });
};

//function save the users array back to users.json file
async function write_all_users (){
    await fs.writeFile('./config/users.json',JSON.stringify(users));
};


function write_validation_token(){
    fs.writeFile('./config/validationTokens.json',JSON.stringify(validation_token));
}

function get_request(){
    const filter_request = users.filter(user => user.status === 'created');
    return filter_request;
};

function check_token(token){
    return validation_token.includes(token);
};

const add_new_user = (new_user) =>{
    users.push(new_user);
    write_all_users();
};

//return the current user id
const get_users_counter = () =>{
    const user_counter = users.length + 1;
    return user_counter;
};

//return the current post id
const get_posts_counter = () =>{
    let max_id = 0;
    for(let i = 0; i < users.length; i++){
        for(let j = 0; j < users[i].posts.length; j++)
        {
            max_id = Math.max(max_id, users[i].posts[j].obj_id);
        }
    }
    max_id++;
    return max_id;
};

//returns the current messsage id 
const get_messages_counter = () =>{
    let max_id = 0;
    for(let i = 0; i < users.length; i++){
        console.log(users[i]);
        for(let j = 0; j < users[i].messages.length; j++)
        {
            max_id = Math.max(max_id, users[i].messages[j].obj_id);
        }
    }
    max_id++;
    return max_id;
};

function get_all_users(){
    return users;
}

//function returns the user pointer in users array by compare the email parameter
const find_one = (email) =>
{
    let user = null;
    for(let i = 0; i < users.length; i++)
    {
        if(users[i]. email == email)
        {
            user = users[i]; 
            break;
        }
    }

    return user;
}

const add_validation_token = (toke) =>{
    validation_token.push(toke);
    write_validation_token();
}

const remove_validation_token = (token) =>{
    validation_token = validation_token.filter(loop_token => loop_token !== token);
    write_validation_token();
}

module.exports = {check_token, remove_validation_token, add_validation_token, get_request, add_new_user, read_all_database, write_all_users, get_all_users, get_messages_counter, get_users_counter, get_posts_counter, find_one}