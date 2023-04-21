const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    comment: {type: String, required: true},
    tripDate: {type: Date},
    postDate: {type: Date, default: Date.now},
    country: {type: String, required: true},
    countryId: { type: Number, require: true }

});

module.exports = mongoose.model('Comment', commentSchema); 
