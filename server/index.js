const express = require('express');
const cors = require('cors');
const { pool, initDB } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

app.get('/', (req, res) => {
    res.send('Rural School Attendance System API');
});

app.get('/api/debug', async (req, res) => {
    try {
        const result = await pool.query('SELECT current_database(), current_user, version()');
        const tables = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        res.json({
            status: 'connected',
            db: result.rows[0],
            tables: tables.rows.map(r => r.table_name)
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
