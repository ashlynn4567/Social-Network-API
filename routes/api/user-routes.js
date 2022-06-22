// imports
const router = require("express").Router();
const {
    getAllUsers,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
    addFriend, 
    deleteFriend
} = require("../../controllers/user-controller");

// get and create users
router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

// get, update, and delete a single user
router
    .route("/:id")
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

// add or delete friend from a user
router
    .route("/:id/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

// exports
module.exports = router;