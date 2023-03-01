const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      // default: null
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: time => formatTime(time),
    }
  }
)

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: timestamp => formatTime(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      reactionSchema
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    // id: false,
  }
);



// thoughtSchema.virtual('reactionCount').get(function() {
//   return this.reactions.length;
// });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;