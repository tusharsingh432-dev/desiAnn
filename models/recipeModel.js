const mongoose = require('mongoose');

const recipieSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: [true, 'Name is required']
    },
    addedBy: {
        type: 'string',
        required: [true]
    },
    photo: String,
    ingredients: Array,
    date: Date,
    reviews: {
        type: Array,
        default: []
    },
    offeredBy: {
        type: Array,
        default: []
    },
})

recipieSchema.pre('save', function (next) {
    if (!this.isNew) return next();
    this.date = Date.now();
    next();
})

const Recipie = mongoose.model('Recipie', recipieSchema);
module.exports = Recipie;