const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    locationId:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    address: {
        type: String
    },
    timmings: {
        type: String
    },
    images: {
        type: [String]
    },
    coverImage: {
        type: String
    },
    type: {
        type: String,
        enum: ['Food', 'Entertainment',]
    },
    tags: {
        type: [String]
    }
});

const Location = module.exports = mongoose.model('Location', LocationSchema);