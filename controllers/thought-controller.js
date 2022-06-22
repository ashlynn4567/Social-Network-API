// imports
const { Thought, User } = require("../models");

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought
            .find({})
            .populate({
                path: "reactions", 
                select: "-__v"
            })
            .select("-__v")
            .sort({_d: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }, 

    // get ONE thought by id
    getOneThought({ params }, res) {
        Thought
            .findOne({ _id: params.id })
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "})
                    return;
                };    
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })

    }, 

    // add thought to user
    addThought({ params, body}, res) {
        Thought
            .create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.usersId }, 
                    { $push: { thought: _id } }, 
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "})
                    return;
                };    
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // add reaction to thought
    addReaction({ params, body }, res) {
        Thought
            .findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            )
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "})
                    return;
                };    
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thought
            .findOneAndUpdate(
                { _id: params.id }, 
                body, 
                { 
                    new: true,
                    runValidators: true
                }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "})
                    return;
                };    
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete thought by id
    deleteThought({ params }, res) {
        Thought
            .findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "})
                    return;
                };    
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete reaction by id
    deleteReaction({ params }, res) {
        Thought
            .findOneAndUpdate(
                { _id: params.thoughtId }, 
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "})
                    return;
                };    
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

// exports
module.exports = thoughtController;