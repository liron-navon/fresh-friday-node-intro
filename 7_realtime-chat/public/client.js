const websocketURL = 'ws://localhost:3000';
let ws = null;
let user = null;
let usersInChat = [];

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
    document.querySelector('#usersInChat').innerHTML = usersInChat.join('<br/>');
}

// event handlers to handle socket events
const eventHandlers = {
    // when we initiate the session
    initialMessages({data}) {
        const {users, messages} = data;
        const chatContent = document.querySelector('#chatContent');
        chatContent.innerHTML = messages.map((msg) => messageToHTML(msg)).join('');
        usersInChat = users;
    },
    // when a new message is created
    newMessage({data}) {
        const chatContent = document.querySelector('#chatContent');
        chatContent.innerHTML += messageToHTML(data)
    },
    // when a new user joins
    userJoined({ data }) {
        usersInChat.push(data);
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
    ws = new WebSocket(websocketURL);

    // select elements
    user = document.querySelector(nameSelector).value;
    const section1 = document.querySelector('#section1');
    const section2 = document.querySelector('#section2');

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
    const message = document.querySelector(inputSelector).value;
    ws.send(JSON.stringify({
        action: 'new',
        data: {
            text: message
        }
    }))
}
