const users = [];

//Join user to chat
module.exports.userJoin =(id, username, room)=>{
    const user ={
        id,
        username,
        room
    };
    users.push(user);
    
    return user;
};

//Get the current user
module.exports.getCurrentUser =(id)=>{
    return users.find( user => user.id === id
       
    );
};

//user leave the chat
module.exports.userLeave =(id)=>{
    const index = users.find( user =>{
        user.id ===id;
    });
    if(index !== -1){
        return users.splice(index,1)[0];
    };
};

//get room users
module.exports.getRoomUsers =(room)=>{
    return users.filter(user=>{
        user.room === room;
    });
};

