
const database = require('../config/database');
const StatusCodes = require('http-status-codes').StatusCodes;

//creation post object
function Post(text){
    this.text = text;
    this.obj_id = database.get_posts_counter();
    this.creation_date = new Date();
}

//function create new post and add it to the user posts array
const create_post = (request, response) =>{

    const text = request.body.text;

    if(text !== ''){
        const post = new Post(text); 

        const user = database.find_one(request.user.name);
        if(user !== null && user.status === 'active'){
            user.posts.push(post);
            database.write_all_users();
            response.status(StatusCodes.OK);
            response.send(JSON.stringify(post));
        }
        else{
            response.status(StatusCodes.NOT_FOUND);
            response.send('user not found or not activate');
        }
    }
    else{
        response.status(StatusCodes.BAD_REQUEST);
        response.send('Input require.');
    }
};

//function return all user post by getting the wanted user email
const find_user_posts = (request, response) =>{

    const email = request.body.email.toLowerCase();
    
    if(email !== ''){
        const user = database.find_one(email);
    
        if(user === null)
        {
            response.status(StatusCodes.NOT_FOUND);
            response.send('invalid user email');
        }
        else{
            response.status(StatusCodes.OK);
            response.send(JSON.stringify(user.posts));
        }
    }
    else{
        response.status(StatusCodes.BAD_REQUEST);
        response.send('User email require.');
    }
};

const get_post_index = (post_id, user) =>{
    let post_index = -1;
    for(let i = 0; i < user.posts.length; i++)
    {
        if(user.posts[i].obj_id === post_id)
        {
            post_index = i;
            break;
        }
    }
    return post_index
};

//delete post as admin 
const delete_post_admin = (request, response) =>{
    if(request.user.id == 1){
        const post_id = request.body.obj_id, email = request.body.email;
        if(!post_id || !email){
            response.status(StatusCodes.BAD_REQUEST);
            response.send('Inputs required.'); 
        }
        else{
            const user = database.find_one(email.toLowerCase());
            if(user !== null){
                const post_index = get_post_index(post_id, user);
                if(post_index === -1)
                {
                    response.status(StatusCodes.NOT_FOUND);
                    response.send('invalid post id');   
                }
                else
                {
                    const deleted_post = user.posts[post_index]
                    user.posts = user.posts.filter(post => post.obj_id !== deleted_post.obj_id);
                    database.write_all_users();
                    response.status(StatusCodes.OK);
                    response.send(JSON.stringify(deleted_post));
                }
            }
            else{
                response.status(StatusCodes.NOT_FOUND);
                response.send("User not found");
            } 
        }
    }else{
        response.status(StatusCodes.UNAUTHORIZED);
        response.send('User unauthorized to delete other user posts.');  
    }
};

//delete post as user 
const delete_post = (request, response) =>{
    const post_id = request.body.obj_id;
    if(post_id !== null){

        const user = database.find_one(request.user.name);
        const post_index = get_post_index(post_id, user);

        if(post_index === -1)
        {
            response.status(StatusCodes.NOT_FOUND);
            response.send('invalid post id');   
        }
        else
        {
            const deleted_post = user.posts[post_index]
            user.posts = user.posts.filter(post => post.obj_id !== deleted_post.obj_id);
            database.write_all_users();
            response.status(StatusCodes.OK);
            response.send(JSON.stringify(deleted_post));
        }    
    }
    else{
        response.status(StatusCodes.BAD_REQUEST);
        response.send('post id require.');
    }
};

module.exports = {delete_post_admin, delete_post, find_user_posts, create_post};