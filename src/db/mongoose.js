const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.includes('password')) {
        throw new Error('Password should not contain string password');
      }
    }
  }
});

const me = new User({
  name: '   Arthur  ',
  email: 'MYEMAIL@MEAD.IO  ',
  password: 'password'
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch(error => {
    console.log('Error!', error);
  });

const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

// const task = new Task({
//   description: 'wash clothes',
//   completed: true
// });

// task
//   .save()
//   .then(() => {
//     console.log(task);
//   })
//   .catch(error => {
//     console.log('Error!', error);
//   });
