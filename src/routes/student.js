const {Router} = require('express');
const mongoose = require('mongoose');
const Student = require('../models/Student');
const {checkNotAuth} = require('../middlewares/isAuth');

const router = Router();

router.get('/', checkNotAuth, async (req, res) => {
    try {
        const students = await Student.find({});
        res.render('student.ejs', { message: students })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.post('/', checkNotAuth, async (req, res) => {
    try {
        const {name} = req.body;

        const existing = await Student.findOne({ name });

        if (existing) {
            res.render('student.ejs', { message: 'student exist' })
        }


        const students = new Student({
            name
        });

        await students.save();

        res.redirect('/school/student')
    } catch (e) {
        res.render('student.ejs', { message: 'Something went wrong, try again' })
    }
});

router.put('/', checkNotAuth, async (req, res) => {
    try {
        const {id, name} = req.body;

        const existing = await Student.findById(id);

        if (!existing) {
            res.render('student.ejs', { message: 'Student not found' });
        }

        await Student.findByIdAndUpdate(
            id,
            { $set: { name } },
            { new: true },
        );

        res.redirect('/school/student')
    } catch (e) {
        res.render('student.ejs', { message: 'Something went wrong, try again' })
    }
});

router.delete('/', checkNotAuth, async (req, res) => {
    try {
        const {id} = req.body;

        const existing = await Student.findById(id);

        if (!existing) {
            res.render('student.ejs', { message: 'student not exist' })
        }

        await Student.findByIdAndRemove(id);

        res.redirect('/school/student')
    } catch (e) {
        res.render('student.ejs', { message: 'Something went wrong, try again' })
    }
});

module.exports = router;