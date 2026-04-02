const { pool } = require('../db');

const createStudent = async (req, res) => {
    try {
        const { name, roll_number, class_grade, parent_contact, address } = req.body;
        const newStudent = await pool.query(
            'INSERT INTO students (name, roll_number, class_grade, parent_contact, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, roll_number, class_grade, parent_contact, address]
        );
        res.json(newStudent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const allStudents = await pool.query('SELECT * FROM students');
        res.json(allStudents.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
};

const getStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
        res.json(student.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, roll_number, class_grade, parent_contact, address } = req.body;
        const updateStudent = await pool.query(
            'UPDATE students SET name = $1, roll_number = $2, class_grade = $3, parent_contact = $4, address = $5 WHERE id = $6',
            [name, roll_number, class_grade, parent_contact, address, id]
        );
        res.json("Student was updated!");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteStudent = await pool.query('DELETE FROM students WHERE id = $1', [id]);
        res.json("Student was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
};
