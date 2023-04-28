const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    comment: {type: String, required: true},
    countryName: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }    

});

module.exports = mongoose.model('Comment', commentSchema); 
