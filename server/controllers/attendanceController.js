const { pool } = require('../db');

const markAttendance = async (req, res) => {
    try {
        const { student_id, date, status, remarks } = req.body;
        // Upsert logic (Insert or Update if exists for student + date)
        const check = await pool.query('SELECT * FROM attendance WHERE student_id = $1 AND date = $2', [student_id, date]);

        let result;
        if (check.rows.length > 0) {
            result = await pool.query(
                'UPDATE attendance SET status = $1, remarks = $2 WHERE student_id = $3 AND date = $4 RETURNING *',
                [status, remarks, student_id, date]
            );
        } else {
            result = await pool.query(
                'INSERT INTO attendance (student_id, date, status, remarks) VALUES ($1, $2, $3, $4) RETURNING *',
                [student_id, date, status, remarks]
            );
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
};

const getAttendanceByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const attendance = await pool.query(
            `SELECT a.*, s.name, s.roll_number 
             FROM attendance a 
             JOIN students s ON a.student_id = s.id 
             WHERE a.date = $1`,
            [date]
        );
        res.json(attendance.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
};

const getStudentAttendance = async (req, res) => {
    try {
        const { studentId } = req.params;
        const attendance = await pool.query('SELECT * FROM attendance WHERE student_id = $1 ORDER BY date DESC', [studentId]);
        res.json(attendance.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
};

module.exports = {
    markAttendance,
    getAttendanceByDate,
    getStudentAttendance
};
