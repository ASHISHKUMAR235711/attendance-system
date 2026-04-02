import React, { useState, useEffect } from 'react';
import api from '../api';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        name: '', roll_number: '', class_grade: '', parent_contact: '', address: ''
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await api.get('/students');
            setStudents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/students', form);
            fetchStudents();
            setForm({ name: '', roll_number: '', class_grade: '', parent_contact: '', address: '' });
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.details || err.response?.data?.error || 'Error adding student';
            alert(`Failed: ${errorMessage}`);
        }
    };

    return (
        <div className="page-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>

                {/* Form Section */}
                <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                        Add New Student
                    </h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <FormInput name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                        <FormInput name="roll_number" placeholder="Roll Number" value={form.roll_number} onChange={handleChange} required />
                        <FormInput name="class_grade" placeholder="Class Grade" value={form.class_grade} onChange={handleChange} required />
                        <FormInput name="parent_contact" placeholder="Parent Contact" value={form.parent_contact} onChange={handleChange} />
                        <FormInput name="address" placeholder="Address" value={form.address} onChange={handleChange} />

                        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                            + Add Student
                        </button>
                    </form>
                </div>

                {/* List Section */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Student Directory</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                            <thead>
                                <tr style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'left' }}>
                                    <th style={thStyle}>Name</th>
                                    <th style={thStyle}>Roll No</th>
                                    <th style={thStyle}>Class</th>
                                    <th style={thStyle}>Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id} style={trStyle}>
                                        <td style={tdStyle}>
                                            <div style={{ fontWeight: '500' }}>{student.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{student.address}</div>
                                        </td>
                                        <td style={tdStyle}><span style={badgeStyle}>{student.roll_number}</span></td>
                                        <td style={tdStyle}>{student.class_grade}</td>
                                        <td style={tdStyle}>{student.parent_contact}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormInput = (props) => (
    <input {...props} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }} />
);

const thStyle = { padding: '1rem', fontWeight: '600' };
const tdStyle = { padding: '1rem' };
const trStyle = { background: 'rgba(255,255,255,0.03)', transition: 'background 0.2s' };
const badgeStyle = {
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#60a5fa',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '0.85rem'
};

export default Students;
