import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  username: String,
  action: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  time: String,
  date: String
}, {
  timestamps: true
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;
