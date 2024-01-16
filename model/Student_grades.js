const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    studentemail: {
        type: String
    },
    marksobtained:{
        type: String
    }
})

module.exports = mongoose.model('studentgrade', gradeSchema);