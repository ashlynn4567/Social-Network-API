// imports
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const UserSchema = new Schema(
    {
        username: {
            type: String, 
            required: true, 
            unique: true, 
            trim: true
        }, 
        email: {
            type: String, 
            required: true, 
            unique: true, 
            validate: [validateEmail, "Please provide a valid email address!"], 
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        }, 
        thoughts: [
            {
                type: Schema.Types.ObjectId, 
                ref: "Thought"
            }
        ], 
        friends: [
            {
                type: Schema.Types.ObjectId, 
                ref: "User"
            }
        ]
    }, 
    {
        toJSON: {
            virtuals: true, 
            getters: true
        }, 
        id: false
    }
);

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const User = model("User", UserSchema);

// exports 
module.exports = User;