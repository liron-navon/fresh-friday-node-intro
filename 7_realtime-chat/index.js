const WebSocket = require('ws');
const uuid = require('uuid/v4');
const http = require('http');
const express = require('express');
const db = require('./db');

const port = 3000;

// for easier management we can keep all the event names here
// or in an Enum in typescript
const events = {
    // emitted when a user enters the chat and he gets all the messages
    initialMessages: 'initialMessages',
    // emitted when a new message in created
    newMessage: 'newMessage',
    // emitted when a user leaves the chat
    userLeft: 'userLeft',
    // emitted when a user joins the chat
    userJoined: 'userJoined'
};

// we use express to serve the frontend files
const app = express();
app.use(express.static('public'));

// create an http server and pass express as a handler
const server = http.createServer(app);

// setup the websockets server
const wss = new WebSocket.Server({ server });

// we will store sockets and messages here
let sockets = [];

// emit an event to all the connections
function emitToAll(event, data) {
    const message = JSON.stringify({
        event,
        data
    });

    console.log('emitting: ', JSON.parse(message));
    sockets.forEach((ws) => {
        ws.send(message)
    });
}

// emit an event to a single connection
function emit(ws, event, data) {
    const e = {event, data};
    console.log('emitting: ', e);
    ws.send(JSON.stringify(e));
}

const actionHandlers = {
    // initiate a new connection, setup the user context
    // and adds the user to the sockets list
    init(message, ws) {
        const user = message.data.user;
        ws.context = {user};
        emit(ws, events.initialMessages, {
            messages: db.getMessages(),
            users: sockets.map(ws => ws.context.user)
        });
        sockets.push(ws);
        emitToAll(events.userJoined, { user });
    },
    // create a new message and tell everyone about it
    new(message, ws) {
        const {context} = ws;
        if (!context) {
            return;
        }
        const msg = {
            text: message.data.text,
            user: context.user,
            timestamp: Date.now(),
            id: uuid()
        };
        db.addMessage(msg);
        emitToAll(events.newMessage, msg);
    },
    // tell everyone a user have just left
    userLeft(message, ws) {
        const {context} = ws;
        if (!context) {
            return;
        }
        emitToAll(events.userLeft, context.user);
    }
};

// clean all the dead or broken sockets
function cleanSockets() {
    sockets = sockets.filter((ws) => {
        return ws._socket.readable;
    })
}

wss.on('connection', function connection(ws) {
    // called when we get a new message
    ws.on('message', function incoming(message) {
        const messageData = JSON.parse(message);
        console.log('received ', messageData);

        const handler = actionHandlers[messageData.action];
        if (handler) {
            handler(messageData, ws);
        }
    });

    // called when the connection is closed
    ws.on('close', function close(event) {
        cleanSockets();
        console.log(sockets.length);
        actionHandlers.userLeft(event, ws);
    });
});

server.listen(port, () => {
    console.log('websockets listening on ws://localhost:3000');
    console.log('http listening on http://localhost:3000/');
});
