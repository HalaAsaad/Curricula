const express = require('express');
const router = express.Router();
const subjectControllers = require('../controllers/subject');

router.get('/getSubjects', subjectControllers.getSubjects);
router.post('/getSubjects', subjectControllers.getPaginationSubjects);
router.post('/saveSubject', subjectControllers.saveSubject);
router.patch('/updateSubject/:subjectId', subjectControllers.updateSubject);
router.delete('/deleteSubject/:subjectId', subjectControllers.deleteSubject);

module.exports = router;