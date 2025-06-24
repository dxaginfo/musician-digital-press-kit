const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  artistName: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    maxlength: 5000
  },
  profileImageUrl: {
    type: String
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: {
    type: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String
}, { 
  timestamps: true 
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  const user = this;
  
  // Only hash the password if it's modified (or new)
  if (!user.isModified('password')) return next();
  
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash password with salt
    const hashedPassword = await bcrypt.hash(user.password, salt);
    
    // Replace plaintext password with hashed one
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get user's full name
userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Virtual for display name (artist name or full name)
userSchema.virtual('displayName').get(function() {
  return this.artistName || this.getFullName();
});

// Transform method to remove sensitive fields
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.passwordResetToken;
  delete user.passwordResetExpires;
  delete user.verificationToken;
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;