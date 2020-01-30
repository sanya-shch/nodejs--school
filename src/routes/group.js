const {Router} = require('express');
const mongoose = require('mongoose');
const Group = require('../models/Group');
const {checkNotAuth} = require('../middlewares/isAuth');

const router = Router();

router.get('/', checkNotAuth, async (req, res) => {
    try {
        const groups = await Group.find({});
        res.render('group.ejs', { message: groups })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.post('/', checkNotAuth, async (req, res) => {
    try {
        const {name} = req.body;

        const existing = await Group.findOne({ name });

        if (existing) {
            res.render('group.ejs', { message: 'group exist' })
        }

        const group = new Group({
            name
        });

        await group.save();

        res.redirect('/school/group')
    } catch (e) {
        res.render('group.ejs', { message: 'Something went wrong, try again' })
    }
});

router.put('/', checkNotAuth, async (req, res) => {
    try {
        const {id, name, student_id} = req.body;

        const existing = await Group.findById(id);

        if (!existing) {
            res.render('group.ejs', { message: 'Group not found' });
        }

        if(student_id) {
            const group = await Group.findOneAndUpdate(
                {_id:id},
                { $push: { students: student_id } }
            );

            await group.save();
        }
        if(name) {
            await Group.findByIdAndUpdate(
                id,
                { $set: { name } }
            );
        }

        res.redirect('/school/group')
    } catch (e) {
        res.render('group.ejs', { message: 'Something went wrong, try again' })
    }
});

router.delete('/', checkNotAuth, async (req, res) => {
    try {
        const {id, student_id} = req.body;

        const existing = await Group.findById(id);

        if (!existing) {
            res.render('group.ejs', { message: 'group not exist' })
        }

        if (student_id) {
            const group = await Group.findOneAndUpdate(
                {_id:id},
                { $pull: { students: student_id } }
            );

            await group.save();
        } else {
            await Group.findByIdAndRemove(id);
        }

        res.redirect('/school/group')
    } catch (e) {
        res.render('group.ejs', { message: 'Something went wrong, try again' })
    }
});

module.exports = router;