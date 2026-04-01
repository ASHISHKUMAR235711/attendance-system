import React, { useState, useEffect } from 'react';
import { QRCode } from 'react-qr-code';
import api from '../api';

const StudentQRCodes = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await api.get('/students');
                setStudents(res.data);
            } catch (err) {
                console.error("Error fetching students:", err);
            }
        };
        fetchStudents();
    }, []);

    const printPage = () => {
        window.print();
    };

    return (
        <div className="page-container" style={{ maxWidth: '1000px', margin: '2rem auto' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0 }}>Student QR Codes</h2>
                    <button onClick={printPage} className="btn-primary">
                        🖨️ Print QR Codes
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '2rem'
                }}>
                    {students.map(student => (
                        <div key={student.id} style={{
                            background: 'white',
                            padding: '1rem',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: 'black',
                            textAlign: 'center'
                        }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <QRCode
                                    value={student.roll_number}
                                    size={120}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{student.name}</div>
                            <div style={{ fontSize: '0.9rem', color: '#555' }}>
                                Roll No: {student.roll_number}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#555' }}>
                                Class: {student.class_grade}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Print Styles */}
            <style>
                {`
                    @media print {
                        nav, .btn-primary { display: none !important; }
                        .glass-panel { box-shadow: none !important; background: none !important; border: none !important; }
                        body { background: white !important; color: black !important; }
                        .page-container { margin: 0 !important; max-width: none !important; }
                    }
                `}
            </style>
        </div>
    );
};

export default StudentQRCodes;
