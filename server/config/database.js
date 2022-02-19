let users = [];
// let users = {};
// let posts = [];
let validation_token = [];
const fs = require('fs').promises;

//suntion reads the users and tokens array from files that used a DB
async function read_all_database (){
    await fs.readFile('./server/config/users.json').then((data) =>{
        const users_from_file = (JSON.parse(data));
        users = [...users_from_file];
    }).catch((error) => {console.log("users file reading error");
    throw error;
    });

    await fs.readFile('./server/config/validationTokens.json').then((data) =>{
        const tokens_from_file = (JSON.parse(data));
        validation_token = [...tokens_from_file];
    }).catch((error) => {console.log("tokens file reading error");
    throw error;
    });

    // await fs.readFile('./config/posts.json').then((data) =>{
    //     const posts_from_file = (JSON.parse(data));
    //     posts = [...posts_from_file];
    // }).catch((error) => {console.log("posts file reading error");
    // throw error;
    // });
};

//function save the users array back to users.json file
async function write_all_users (){
    await fs.writeFile('./server/config/users.json',JSON.stringify(users));
};

// async function write_all_posts (){
//     await fs.writeFile('./config/posts.json',JSON.stringify(posts));
// };

function write_validation_token(){
    fs.writeFile('./server/config/validationTokens.json',JSON.stringify(validation_token));
}

function get_all_created_users(){
    const filter_request = users.filter(user => user.status === 'active');
    return filter_request;
};

// TODO: test!
const get_all_posts = () => {
    all_posts_sorted = get_all_created_users().map(user => user.posts)
    .sort(compare_posts);
    return all_posts_sorted;
};

const get_all_user_posts = (email) => {
    const user = database.match_email_to_user(email.toLowerCase());
    const posts = user.posts.sort(compare_posts); 
};

const get_user_latest_post = (email) => {
    const all_posts =  get_all_user_posts(email);
    return all_posts[all_posts.length - 1];
};

function check_token(token){
    return validation_token.includes(token);
};

const add_new_user = (new_user) => {
    users.push(new_user);
    // users[new_user.obj_id] = new_user;
    write_all_users();
};

// const add_new_post = (new_post) => {
//     posts.push(new_post);
//     write_all_posts();
// }

//return the current user id
const get_users_counter = () =>{
    // return Object.keys(users).length + 1;
    return users.length + 1;
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
    // return posts.length + 1;
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
    // return Object.values(users);
    return users;
};

//function returns the user pointer in users array by compare the email parameter
const match_email_to_user = (email) =>
{
    let user = null;
    // users_list = Object.values(users);
    for (let i = 0; i < users.length; i++) {
        if(users[i].email == email)
        {
            user = users[i]; 
            break;
        }
    }

    return user;
}

// const get_user_by_id = (user_id) =>
// {
//     return users[user_id];
// }

const add_validation_token = (toke) =>{
    validation_token.push(toke);
    write_validation_token();
};

const remove_validation_token = (token) =>{
    validation_token = validation_token.filter(loop_token => loop_token !== token);
    write_validation_token();
};

const compare_posts = (post1, post2) => new Date.parse(post1.creation_date).getTime() > new Date.parse(post2.creation_date).getTime() ? 1 : -1;

// module.exports = {check_token, remove_validation_token, add_validation_token, get_all_created_users, add_new_user, read_all_database, write_all_users, get_all_users, get_messages_counter, get_users_counter, get_posts_counter, match_email_to_user, get_user_by_id, write_all_posts, add_new_post, get_all_posts}
module.exports = {check_token, remove_validation_token, add_validation_token, get_all_created_users, add_new_user, read_all_database, write_all_users, get_all_users, get_messages_counter, get_users_counter, get_posts_counter, match_email_to_user, get_all_posts, get_user_latest_post}