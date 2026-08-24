import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  schemeId: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  title: String,
  category: String,
  maxLoanAmount: Number,
  subsidyRate: Number,
  interestRate: Number,
  tenureYears: Number,
  eligibilityCriteria: Object
}, {
  timestamps: true
});

const Scheme = mongoose.model('Scheme', schemeSchema);
export default Scheme;
