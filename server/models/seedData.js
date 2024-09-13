import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  workSerialNumber: {
    type: Number,
    required: true
  },
  workStatus: {
    type: String,
    enum: ['satisfied', 'content', 'neutral', 'displeased', 'frustrated'],
    required: true
  }
});

export const Review = mongoose.model('Review', reviewSchema);