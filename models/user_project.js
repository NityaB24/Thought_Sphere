const mongoose = require ('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/miniproject_app')
.then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

  const userSchema = mongoose.Schema({
    username: String,
    name:String,
    age: Number,
    email: String,
    password: String,
    profilepic:{
      type: String,
      default: "default.jpg"
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
  })

  module.exports = mongoose.model('user', userSchema);