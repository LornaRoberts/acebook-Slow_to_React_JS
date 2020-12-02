var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({

  author_id: {
    type: String,
    required: false
  },
  author_name: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  like: {
    type:  Array
},
    likes:{
      type: Number,
      default: 0
    }

});

module.exports = PostSchema;
