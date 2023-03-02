const Thought = require('../models/Thought');
const User = require('../models/User')
module.exports = {
  getThoughts(req, res) {
    Thought.find({})
      .populate('reactions')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err))
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => 
      !thought
        ? res.status(404).json({ message: 'no thought with that id' })
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err))
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(thought)
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id} },
          { new: true },
        );
      })
      .then((thought) => 
        !thought
          ? res.status(404).json({
            message: 'Thought created, but found no user with that ID'
          })
          : res.json('Thought created!')
        )
      .catch((err) => 
      {console.log(err)
      res.status(500).json(err)}
      )
  },
  updateSingleThought(req, res) {
    Thought.updateOne(
      { _id: req.params.thoughtId },
      { $set: { thoughtText: req.body.thoughtText }}
    )
    .then((thought) => 
    !thought
      ? res.status(404).json({ message: 'could not update thought' })
      : res.json(thought)
    )
  },
  deleteThought(req, res) {
    Thought.deleteOne({ _id: req.params.thoughtId })
      .then((thought) => 
      !thought
        ? res.status(404).json({ message: 'thought could not be deleted' })
        : res.json(thought)
      )
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body }},
      { runValidators: true, new: true },
    )
    .then((thought) => 
      !thought
        ?res.status(404).json({ message: 'no thought with that id'})
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err))
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body.reactionId }},
      // { runValidators: true, new: true },
    )
    .then((thought) => 
      !thought
        ?res.status(404).json({ message: 'no thought with that id'})
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err))
  },
}