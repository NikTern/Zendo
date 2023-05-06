const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  quoteApi: {
    type: String,
    enum: ['GOODREADS_TOPIC1', 'GOODREADS_TOPIC2', 'GOODREADS_TOPIC3'],
    default: 'GOODREADS_TOPIC1',
  },
  videoApi: {
    type: String,
    enum: ['YOUTUBE_TOPIC1', 'YOUTUBE_TOPIC2', 'YOUTUBE_TOPIC3'],
    default: 'YOUTUBE_TOPIC1',
  },
  pictureApi: {
    type: String,
    enum: ['UNSPLASH_TOPIC1', 'UNSPLASH_TOPIC2', 'UNSPLASH_TOPIC3'],
    default: 'UNSPLASH_TOPIC1',
  },
  skills: [
    {
      type: String,
      trim: true,
    },
  ],
});

// set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

module.exports = Profile;
