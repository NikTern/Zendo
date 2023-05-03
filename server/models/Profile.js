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
    enum: ['QUOTE_API_1', 'QUOTE_API_2', 'QUOTE_API_3'],
    default: 'QUOTE_API_1',
  },
  videoApi: {
    type: String,
    enum: ['VIDEO_API_1', 'VIDEO_API_2', 'VIDEO_API_3'],
    default: 'VIDEO_API_1',
  },
  pictureApi: {
    type: String,
    enum: ['PICTURE_API_1', 'PICTURE_API_2', 'PICTURE_API_3'],
    default: 'PICTURE_API_1',
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
