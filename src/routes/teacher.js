const {Router} = require('express');
const mongoose = require('mongoose');
const Teacher = require('../models/Teacher');
const {checkNotAuth} = require('../middlewares/isAuth');

const router = Router();

router.get('/', checkNotAuth, async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.render('teacher.ejs', { message: teachers })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.post('/', checkNotAuth, async (req, res) => {
    try {
        const {name} = req.body;

        const existing = await Teacher.findOne({ name });

        if (existing) {
            res.render('teacher.ejs', { message: 'teacher exist' })
        }


        const teacher = new Teacher({
            name
        });

        await teacher.save();

        res.redirect('/school/teacher')
    } catch (e) {
        res.render('teacher.ejs', { message: 'Something went wrong, try again' })
    }
});

router.put('/', checkNotAuth, async (req, res) => {
    try {
        const {id, name} = req.body;

        const existing = await Teacher.findById(id);

        if (!existing) {
            res.render('teacher.ejs', { message: 'Teacher not found' });
        }

        await Teacher.findByIdAndUpdate(
            id,
            { $set: { name } },
            { new: true },
        );

        res.redirect('/school/teacher')
    } catch (e) {
        res.render('teacher.ejs', { message: 'Something went wrong, try again' })
    }
});

router.delete('/', checkNotAuth, async (req, res) => {
    try {
        const {id} = req.body;

        const existing = await Teacher.findById(id);

        if (!existing) {
            res.render('teacher.ejs', { message: 'teacher not exist' })
        }

        await Teacher.findByIdAndRemove(id);

        res.redirect('/school/teacher')
    } catch (e) {
        res.render('teacher.ejs', { message: 'Something went wrong, try again' })
    }
});

module.exports = router;