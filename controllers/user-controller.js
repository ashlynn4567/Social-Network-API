// imports
const { User } = require("../models");

const userController = {
    // get all users
    getAllUsers() {
        User
            .find({})
            .populate({
                path: "thought", 
                select: "-__v"
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get ONE user by id
    getOneUser() {
        User
            .findOne({ _id: params.id })
            .populate({
                path: "thought", 
                select: "-__v"
            })
            .select("-__v")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id! "})
                    return;
                };    
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create new user
    createUser() {
        User
            .create(body)
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id! "})
                    return;
                };    
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // update user by id
    updateUser() {
        User
            .findOneAndUpdate(
                { _id: params.id },
                body, 
                {
                    new: true, 
                    runValidators: true
                }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id! "})
                    return;
                };    
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // add friend to user
    addFriend() {
        User
            .findOneAndUpdate(
                { _id: params.id },
                { $push: { friends: params.friendId } },
                { new: true }
            )
            .populate(
                {
                    path: "friends",
                    select: "-__v"
                }
            )
            .select("-__v")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id! "})
                    return;
                };    
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete user by id
    deleteUser() {
        User
            .findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete friend by id
    deleteFriend() {
        User
            .findOneAndUpdate(
                { _id: params.id },
                { $pull: { friends: params.friendId }},
                { new: true }
            )
            .populate(
                { 
                    path: "friends",
                    select: "-__v"
                }
            )
            .select("-__v")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id! "})
                    return;
                };    
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

// exports
module.exports = userController;