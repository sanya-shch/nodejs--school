const {Router} = require('express');
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const {checkNotAuth} = require('../middlewares/isAuth');

const router = Router();

router.get('/', checkNotAuth, async (req, res) => {
    try {
        const lessons = await Lesson.find({});
        res.render('lesson.ejs', { message: lessons })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.post('/', checkNotAuth, async (req, res) => {
    try {
        const {theme, auditorium, number_of_lesson, teacher, group} = req.body;

        const existing = await Lesson.findOne({ theme });

        if (existing) {
            res.render('lesson.ejs', { message: 'Lesson exist' })
        }

        const lesson = new Lesson({ theme, auditorium, number_of_lesson, teacher, group });

        await lesson.save();

        res.redirect('/school/lesson')
    } catch (e) {
        res.render('lesson.ejs', { message: 'Something went wrong, try again' })
    }
});

router.put('/', checkNotAuth, async (req, res) => {
    try {
        const {id, theme, auditorium, number_of_lesson, teacher, group} = req.body;

        const existing = await Lesson.findById(id);

        if (!existing) {
            res.render('lesson.ejs', { message: 'Lesson not found' });
        }

        if(theme) {
            await Lesson.findByIdAndUpdate(
                id,
                { $set: { theme } }
            );
        }
        if(auditorium) {
            await Lesson.findByIdAndUpdate(
                id,
                { $set: { auditorium } }
            );
        }
        if(number_of_lesson) {
            await Lesson.findByIdAndUpdate(
                id,
                { $set: { number_of_lesson } }
            );
        }
        if(teacher) {
            await Lesson.findByIdAndUpdate(
                id,
                { $set: { teacher } }
            );
        }
        if(group) {
            await Lesson.findByIdAndUpdate(
                id,
                { $set: { group } }
            );
        }

        res.redirect('/school/lesson')
    } catch (e) {
        res.render('lesson.ejs', { message: 'Something went wrong, try again' })
    }
});

router.delete('/', checkNotAuth, async (req, res) => {
    try {
        const {id} = req.body;

        const existing = await Lesson.findById(id);

        if (!existing) {
            res.render('lesson.ejs', { message: 'Lesson not exist' })
        }

        await Lesson.findByIdAndRemove(id);

        res.redirect('/school/lesson')
    } catch (e) {
        res.render('lesson.ejs', { message: 'Something went wrong, try again' })
    }
});

module.exports = router;