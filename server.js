// imports 
const express = require('express');
const mongoose = require("mongoose");

// instantiate the app with a variable port
const app = express();
const PORT = process.env.PORT || 3001;

// implement formatting of data using middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// directory
app.use(require('./routes'));

// tell mongoose to connect to db. it will create the db if it doesn't already exist
mongoose.connect(process.env.MONGOD_URI || "mongodb://localhost:27017/social_network", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
// log mongo queries being executed
mongoose.set("debug", true);

// set up app to listen on a variable port
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));