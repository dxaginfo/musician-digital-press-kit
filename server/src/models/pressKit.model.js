const mongoose = require('mongoose');
const slugify = require('slugify');

const sectionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['bio', 'photos', 'music', 'videos', 'press', 'contact', 'tour', 'discography']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { _id: true });

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: true });

const customizationSchema = new mongoose.Schema({
  primaryColor: {
    type: String,
    default: '#000000'
  },
  secondaryColor: {
    type: String,
    default: '#ffffff'
  },
  fontFamily: {
    type: String,
    default: 'Arial, sans-serif'
  },
  logoUrl: {
    type: String
  }
}, { _id: false });

const pressKitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  template: {
    type: String,
    required: true,
    default: 'default'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  customization: {
    type: customizationSchema,
    default: () => ({})
  },
  sections: [sectionSchema],
  socialLinks: [socialLinkSchema],
  viewCount: {
    type: Number,
    default: 0
  },
  shareableUrl: {
    type: String
  }
}, { 
  timestamps: true 
});

// Create a unique slug before saving
pressKitSchema.pre('save', async function(next) {
  // Only update slug if title is modified or it's a new document
  if (!this.isModified('title') && this.slug) {
    return next();
  }
  
  let slug = slugify(this.title, { lower: true });
  
  // Check if slug exists and make it unique if needed
  try {
    const count = await mongoose.models.PressKit.countDocuments({ 
      slug: new RegExp(`^${slug}(-[0-9]+)?$`), 
      _id: { $ne: this._id } 
    });
    
    // If slug exists, append a number to make it unique
    if (count > 0) {
      slug = `${slug}-${count + 1}`;
    }
    
    this.slug = slug;
    
    // Generate shareable URL if not exists
    if (!this.shareableUrl) {
      this.shareableUrl = `${process.env.FRONTEND_URL}/kit/${this.slug}`;
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Method to increment view count
pressKitSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

const PressKit = mongoose.model('PressKit', pressKitSchema);

module.exports = PressKit;