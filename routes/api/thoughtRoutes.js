const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateSingleThought,
  deleteSingleThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateSingleThought).delete(deleteSingleThought) //GET, PUT, DELETE

router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;