const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    project_id: {
        type: Schema.Types.ObjectId
    },
    enrolled_date: {
        type: Date
    }
})

module.exports = mongoose.model('studentdetail', studentSchema);