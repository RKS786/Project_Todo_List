// require the library

const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://127.0.0.1/todo_List');

// acquire the connections (to check if it is successful)
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print the message
db.once('open', function(){
    console.log('Successfully connected to the database');
})