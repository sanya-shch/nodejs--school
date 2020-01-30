const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    theme: {
        type: String,
        required: true,
        unique: true
    },
    auditorium: {
        type: String,
        required: true,
        unique: true
    },
    number_of_lesson: {
        type: Number,
        required: true
    },
    teacher: {
        type: Types.ObjectId,
        ref: 'Teacher'
    },
    group: {
        type: Types.ObjectId,
        ref: 'Group'
    }
});

module.exports = model('Lesson', schema);