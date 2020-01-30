const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
});

module.exports = model('Group', schema);