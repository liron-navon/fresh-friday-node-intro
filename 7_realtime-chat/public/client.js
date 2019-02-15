// using secure socket connection for sites secure connection support,
// or regular connection for sites with non secure connection
const webSocketProtocol = location.protocol === 'https:' ? 'wss' : 'ws';
// create our web socket url, it looks like this: ws://localhost:3000;
const webSocketURL = `${webSocketProtocol}://${location.host}`;

let ws = null;
let user = null;
// we will keep a local copy for the messages and users
let usersInChat = [];
let messagesInChat = [];

const section1 = document.querySelector('#section1');
const section2 = document.querySelector('#section2');
const usersInChatContainer = document.querySelector('#usersInChat');
const chatContentContainer = document.querySelector('#chatContent');

// turn a message object to html
function messageToHTML(msg) {
    return `
         <div class="alert ${msg.user === user ? 'alert-success' : 'alert-primary'}" role="alert">
               ${msg.user}: ${msg.text}
               <br>
               <span class="date-item">${new Date(msg.timestamp).toUTCString()}</span>
         </div>
        `
}

// update the users in the chat
function updateUsersInChat() {
    usersInChatContainer.innerHTML = usersInChat.join('<br/>');
}

// event handlers to handle socket events
const eventHandlers = {
    // when we initiate the session
    initialMessages({data}) {
        const {users, messages} = data;
        if (messages.length > 0) {
            chatContentContainer.innerHTML = messages.map((msg) => messageToHTML(msg)).join('');
        }
        usersInChat = users;
        messagesInChat = messages;
    },
    // when a new message is created
    newMessage({data}) {
        if (messagesInChat.length > 0) {
            chatContentContainer.innerHTML = messageToHTML(data) + chatContentContainer.innerHTML;
        } else {
            chatContentContainer.innerHTML = messageToHTML(data);
        }
    },
    // when a new user joins
    userJoined({ data }) {
        usersInChat.push(data.user);
        updateUsersInChat();
    },
    // when a user leaves
    userLeft({ data }) {
        const userIndex = usersInChat.indexOf(data);
        usersInChat.splice(userIndex, 1);
        updateUsersInChat();
    }
};

// initiate the websocket connection
function initConnection(nameSelector) {
    ws = new WebSocket(webSocketURL);

    // select elements
    user = document.querySelector(nameSelector).value;

    // switch sections
    section1.style.display = 'none';
    section2.style.display = 'block';

    // initiate the connection after  opening it
    ws.onopen = () => {
        ws.send(JSON.stringify({
            action: 'init',
            data: {
                user
            }
        }));
    };

    // handle errors
    ws.onerror = (event) => {
        console.error(event);
        alert('We got an error')
    };

    // handle socket messages
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const handler =  eventHandlers[data.event];
        if (handler) {
            handler(data);
        }  else {
            console.warn('unknown event:');
            console.log(event.data)
        }
    };
}

// create a new message
function createMessage(inputSelector) {
    const messageInput = document.querySelector(inputSelector);
    const message = messageInput.value;

    if (message) {
        messageInput.value = ''; // clear the old message
        ws.send(JSON.stringify({
            action: 'new',
            data: {
                text: message
            }
        }))
    }
}
