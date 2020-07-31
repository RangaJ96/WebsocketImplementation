const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//Get username  and room from URL
const { username, room } = Qs.parse(location.search,{
    ignoreQueryPrefix : true
});

console.log(username,room)
const socket = io();

//Join chat Room
socket.emit('joinRoom',{ username , room });

//Message from the server
socket.on('message',message =>{
    console.log(message);
    outputMessage(message);

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});



//message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    //get message text
    const msg = e.target.elements.msg.value;
    
    //Emit the message to the server
    socket.emit('chatMessage',msg);

    //clear  input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});





//output message to the DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"> ${message.username} <span> ${message.time} </span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}