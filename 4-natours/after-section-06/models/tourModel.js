const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, ' A tour must have a name'],
      unique: true,
      trim: true
    },
    slug : String,
    duration: {
      type: Number,
      required: [true, ' A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, ' A tour must have a max group size']
    },
    difficulty: {
      type: String,
      required: [true, ' A tour must have a difficulty']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, ' A tour must have a price']
    },
    priceDiscount: Number,
    summery: {
      type: String,
      trim: true // remove all the white space at the begining and the end
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});
// Document middleware: runs before .save() and .create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {lowercase: true})
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
