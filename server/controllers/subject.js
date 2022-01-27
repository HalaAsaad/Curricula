const { Subject, validate } = require('../models/subject');
const _ = require('lodash');

exports.getSubjects = async (req, res) => {
    const subjects = await Subject.find()
    .select({ name: 1 });
    try {
        await res.send(subjects);
    } catch (error) {
        res.send({message: error.details[0].message})
    }
};
exports.getPaginationSubjects = async (req, res) => {
    let sortfield = req?.body?.sortField || null ;
    
    let subjects;

    if( sortfield && sortfield?.length !== 0 ) {
        subjects = await Subject.find()
        .sort({ [sortfield] : req.body.sortValue }) // e: name: 1, description : -1
        .where({ name : req.body.searchQuery })
        .skip((req.body.pageNumber - 1) * req.body.pageSize)
        .limit(req.body.pageSize)
    } else {
        subjects = await Subject.find()
        .where({ name : req.body.searchQuery })
        .skip((req.body.pageNumber - 1) * req.body.pageSize)
        .limit(req.body.pageSize)
    }
    
    if(!subjects) return res.status(400).send('Invalid request');
    try {
        await res.send({
            items: subjects,
            itemsCount : subjects.length,
            totalItems: await Subject.find().count()
        });
    } catch (error) {
        res.send({message: error.details[0].message})
    }
};
exports.saveSubject = async (req, res) => {
    const { error } = await validate(req.body);
    if(error) return res.status(400).send({message: error.details[0].message});

    let findSubject = await Subject.findOne({ name: req.body.name });
    if(findSubject) return res.status(400).send({ message: 'Subject already existed.'});

    findSubject = new Subject(_.pick(req.body, ['name', 'active', 'description']));
    try {
        await findSubject.save();
        res.send(findSubject);
    } catch (error) {
        res.send({message: error.details[0].message})
    }
};
exports.updateSubject = async (req, res) => {
    const updatedSubject = await Subject.updateOne(
        { _id : req.params.subjectId }, 
        { $set: { name: req.body.name, description: req.body.description, active: req.body.active  } });
    res.json(updatedSubject);
};
exports.deleteSubject = async (req, res) => {
    try {
        const removedSubject = await Subject.remove({ _id : req.params.subjectId })
        res.json('removed successfuly.')
    } catch (error) {
        res.json({ message: error })
    }
};