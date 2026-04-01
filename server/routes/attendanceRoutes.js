const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/', attendanceController.markAttendance);
router.get('/date/:date', attendanceController.getAttendanceByDate);
router.get('/student/:studentId', attendanceController.getStudentAttendance);

module.exports = router;
