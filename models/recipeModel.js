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
    if (!isNew) return next();
    this.date = Date.now();
})

const Recipie = mongoose.model('Recipie', recipieSchema);
module.exports = Recipie;