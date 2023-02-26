const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err))
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId})
      .select('-__v')
      .then((user) => 
      !user
        ? res.status(404).json({ message: 'user not found.'})
        : res.json(user)
      )
      .catch((err) => res.status(500).json(err))
  },
  updateSingleUser(req, res){
    User.updateOne({ _id: req.params.userId }, {$set: {username: req.body.username, email: req.body.email}},
      )
      .then((user) =>
      !user
        ? res.status(404).json({ message: 'could not update user'})
        : res.json(user)
      )
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err))
  },
  deleteUser(req, res) {
    User.deleteOne({ _id: req.params.userId })
      .then((user) => 
      !user
        ? res.status(404).json({ message: 'user could not be deleted'})
        : res.json(user)
      )
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true },
      )
      .then((friend) => !friend ? res.status(400).json({ message: 'could not add friend'}) : res.json(friend))
  },
  deleteFriend(req, res) {
    User.updateOne(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId}}
    )
    .then((friend) => !friend ? res.status(400).json({ message: 'could not delete friend'}) : res.json(friend))  }
}