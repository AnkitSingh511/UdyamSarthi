import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    sparse: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['farmer', 'dairy', 'retail', 'artisan', 'food_vendor', 'apparel'],
    default: 'farmer'
  },
  districtId: {
    type: String,
    default: 'karnal'
  },
  phone: {
    type: String
  },
  details: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
