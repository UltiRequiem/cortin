import mongoose from 'mongoose';

// eslint-disable-next-line import/prefer-default-export
export const Link = mongoose.model('link', {
  url: String,
  public: Boolean,
});
