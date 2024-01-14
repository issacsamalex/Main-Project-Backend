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
    },
    week1sub: {
        type: String
    },
    week2sub: {
        type: String
    },
    week3sub: {
        type: String
    },
    week4sub: {
        type: String
    },
    finalsub: {
        type: String
    },
    vivasub: {
        type: String
    }
})

module.exports = mongoose.model('studentdetail', studentSchema);