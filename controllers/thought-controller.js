// imports
const { Thought, User } = require("../models");

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought
            .find({})
            .select("-__v")
            .sort({ createdAt: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }, 

    // get ONE thought by id
    getOneThought({ params }, res) {
        Thought
            .findOne({ _id: params.thoughtId })
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
                res.status(500).json(err);
            });
    }, 

    // add thought
    addThought({ body }, res) {
        Thought
            .create(body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    { _id: body.userId }, 
                    { $push: { thought: dbThoughtData._id } }, 
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "Thought created, but no user found with this id!" });
                };
                res.json({ message: "Thought created successfully!" });        
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
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
            .select("-__v")
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "})
                    return;
                };    
                res.json({ message: "Reaction created successfully!" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thought
            .findOneAndUpdate(
                { _id: params.thoughtId },
                body, 
                { 
                    new: true,
                    runValidators: true
                }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "});
                    return;
                };    
                res.json({ message: "Thought updated successfully!" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete thought by id
    deleteThought({ params }, res) {
        Thought
            .findOneAndRemove({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "});
                    return;
                };    
                return User.findOneAndUpdate(
                    { thoughts: params.thoughtId }, 
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "Thought deleted but no user found with this id!" });
                };
                res.json({ message: "Thought deleted successfully! "});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete reaction by id
    deleteReaction({ params }, res) {
        Thought
            .findOneAndUpdate(
                { _id: params.thoughtId }, 
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true, runValidators: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "})
                    return;
                };    
                res.json({ message: "Reaction deleted successfully!" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

// exports
module.exports = thoughtController;