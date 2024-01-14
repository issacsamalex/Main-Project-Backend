const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    description: {
        type: String
    },
    docs: {
        type: String
    },
    weeklyreport: {
        type: String
    },
    vivavocereport: {
        type: String
    },
    finalreport: {
        type: String
    },
    img: {
        type: String
    },
    reference: [
        {
            link1: String,
            link2: String
        },
        {
            link1: String,
            link2: String
        },
        {
            link1: String,
            link2: String
        },
        {
            link1: String,
            link2: String
        }
    ]
});

module.exports = mongoose.model('projectdetail', projectSchema);
