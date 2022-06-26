// imports
const { User } = require("../models");

const userController = {
    // get all users
    getAllUsers(req, res) {
        User
            .find({})
            .populate({
                path: "thoughts", 
                select: "-__v"
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // get ONE user by id
    getOneUser({ params }, res) {
        User
            .findOne({ _id: params.id })
            .populate({
                path: "thoughts", 
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
                res.status(500).json(err);
            });
    },

    // create new user
    createUser({ body }, res) {
        User
            .create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // update user by id
    updateUser({ params, body }, res) {
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
                res.json({ message: "User updated successfully!" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // add friend to user
    addFriend({ params }, res) {
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
                res.json({ message: "Friend added successfully!" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete user by id
    deleteUser({ params }, res) {
        User
            .findOneAndDelete({ _id: params.id })
            .then(() => res.json({ message: "User deleted successfully!" }))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete friend by id
    deleteFriend({ params }, res) {
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
                res.json({ message: "Friend deleted successfully!" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

// exports
module.exports = userController;