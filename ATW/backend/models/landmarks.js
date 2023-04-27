const mongoose = require('mongoose');

const landmarkSchema = new mongoose.Schema({
    name: {type: String, required: true},
    country: {type: String, required: true},
    funFact: {type: String},
    // maybe incorporate with AWS
    // image: {type: String, required: true},
    countryName: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }   

});

module.exports = mongoose.model('Landmark', landmarkSchema); 
