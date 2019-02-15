const lowdb = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

// setup lowdb
const dbFile = path.join(__dirname, 'db.json');
const adapter = new FileSync(dbFile);
const db = lowdb(adapter);

// set default data to the database
db.defaults({
    messages: [],
}).write();

module.exports = {
    getMessages() {
        return db.get('messages').value();
    },
    addMessage(message) {
        return db.get('messages')
            .unshift(message)
            .write();
    }
};
