// imports
const router = require("express").Router();
const {
    getAllThoughts,
    getOneThought,
    updateThought,
    deleteThought,
    addThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thought-controller");

// get all thoughts
router
    .route("/")
    .get(getAllThoughts);

// get, update, and delete one thought by id
router
    .route("/:id")
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

// add thought to user
router
    .route("/:userId")
    .post(addThought);

// add reaction to thought
router
    .route("/:thoughtId/reaction")
    .post(addReaction);

// delete reaction from thought
router
    .route("/:thoughtId/reaction/:reactionId")
    .delete(deleteReaction);

// exports
module.exports = router;