const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

categorySchema.pre('validate', function() {
  if (this.name) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true
    });
  }
})

module.exports = mongoose.model('Category', categorySchema);
