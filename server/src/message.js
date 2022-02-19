const database = require('../config/database');
const StatusCodes = require('http-status-codes').StatusCodes;


//creation new message object
function Message(text){
    this.text = text;
    this.obj_id = database.get_messages_counter();
    this.creation_date = new Date();
};

//creation new message and add to the destenation user messages array
const send_message = (request, response) =>{
    if(request.body.text !== ''){
        if(request.body.send_all){
            if(request.user.id === 1){
                const message = send_all_users(request.body.text);
                database.write_all_users();
                response.status(200).send(JSON.stringify(message));
            }
            else{
                response.status(StatusCodes.UNAUTHORIZED);
                response.send("This user is not alowed to send message to all users");
            }
        }
        else{
            if(request.body.to !== null){
                let to_user = database.match_email_to_user(request.body.to.toLowerCase());
                if(to_user === null || to_user.status !== 'active'){
                    response.status(StatusCodes.NOT_FOUND);
                    response.send('Invalid destanation email.');
                }
                else{
                    const new_message = new Message(request.body.text);
                    to_user.messages.push(new_message);
                    database.write_all_users();
                    response.status(200).send(JSON.stringify(new_message));
                }
            }
            else{
                response.status(StatusCodes.BAD_REQUEST);
                response.send('Destenation email require.');
            }
        }
    }
    else{
        response.status(StatusCodes.BAD_REQUEST);
        response.send('Message text require.');
    }
};

//function create message from admin to all users and add it to the messages array of each user
const send_all_users = (message) =>{
    const new_message = {
        text: message,
        obj_id: database.get_messages_counter(),
        creation_date: new Date()
    }

    const users_array = database.get_all_users();
    for(let i = 0; i < users_array.length; i++)
    {
        users_array[i].messages.push(new_message);
    }

    return new_message;
};

//function return message index from the user.messahes array in DB
function find_message(user, id){
    let message_index = -1;
    for(let i = 0; i < user.messages.length ; i++){
        if(user.messages[i].obj_id === id){
            message_index = i;
            break;
        }
    }
    return message_index;
};


//function get the user email and message id to remove (only admin can activate this operation)
const delete_message = (request, response) =>{
    if(request.user.id === 1){
        if(request.body.email !== null){

            const user = database.match_email_to_user(request.body.email.toLowerCase());

            if(user !== null){
                if(request.body.obj_id !== null){
                    const message_index = find_message(user, request.body.obj_id);
                    if(message_index !== -1){
                        const deleted_message = user.messages.splice(message_index);
                        database.write_all_users();
                        response.status(StatusCodes.OK);
                        response.send(JSON.stringify(deleted_message));
                    }
                    else{
                        response.status(StatusCodes.BAD_REQUEST);
                        response.send('invalid message id');
                    }
                }
                else{
                    response.status(StatusCodes.BAD_REQUEST);
                    response.send('Message id require.');
                }
            }
            else{
                response.status(StatusCodes.BAD_REQUEST);
                response.send('invalid user');
            }
        }
        else{
            response.status(StatusCodes.BAD_REQUEST);
            response.send('User email require.');
        }
    }
    else{
        response.status(StatusCodes.UNAUTHORIZED);
        response.send("This user is not alowed to delete a message");
    }
};


const get_all_user_messages = (request, response) =>
{
    email = request.user.name;
    messages = database.get_all_user_messages(email);
    response.send(JSON.stringify(messages));
}

const check_for_new_messages = (request, response) => {
    const timestamp = request.body.timestamp;
    if (!timestamp) {
        const time_to_check = Date.parse(timestamp);
        const all_messages = database.get_all_user_messages();
        const latest_message = all_posts[all_posts.length - 1];
        result = time_to_check < Date.parse(latest_message.creation_date);
        response.send(JSON.stringify(result));
    }
    else {
        response.status(StatusCodes.BAD_REQUEST);
        response.send('Input require; missing timestamp!');
    }
};

// const compare_messages = (msg1, msg2) => Date.parse(msg1.creation_date) > Date.parse(post2.creation_date) ? 1 : -1;

module.exports = {send_message, delete_message, get_all_user_messages, check_for_new_messages};