const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateSingleUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateSingleUser).delete(deleteUser) //GET, PUT, DELETE

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;