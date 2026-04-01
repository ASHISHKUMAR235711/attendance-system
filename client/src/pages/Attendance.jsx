import React, { useState, useEffect } from 'react';
import api from '../api';

const Attendance = () => {
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [attendanceData, setAttendanceData] = useState({});

    // QR Code Scanner Logic
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        fetchStudents();
        window.addEventListener('online', syncOfflineData);
        return () => window.removeEventListener('online', syncOfflineData);
    }, []);

    // QR Logic Hook
    useEffect(() => {
        let scanner = null;
        if (isScanning) {
            const onScanSuccess = (decodedText) => {
                const student = students.find(s => s.roll_number === decodedText);
                if (student) {
                    handleAttendanceChange(student.id, 'status', 'Present');
                    alert(`Marked Present: ${student.name}`);
                } else {
                    alert(`Student not found for QR: ${decodedText}`);
                }
            };

            const onScanFailure = (error) => {
                // console.warn(`Code scan error = ${error}`);
            };

            import('html5-qrcode').then(({ Html5QrcodeScanner }) => {
                scanner = new Html5QrcodeScanner(
                    "reader",
                    { fps: 10, qrbox: { width: 250, height: 250 } },
                    false
                );
                scanner.render(onScanSuccess, onScanFailure);
            });
        }

        return () => {
            if (scanner) {
                scanner.clear().catch(error => console.error("Failed to clear scanner. ", error));
            }
        };
    }, [isScanning, students]);

    const syncOfflineData = async () => {
        const offlineData = JSON.parse(localStorage.getItem('offlineAttendance') || '[]');
        if (offlineData.length === 0) return;

        alert(`Syncing ${offlineData.length} offline records...`);
        try {
            for (const record of offlineData) {
                await api.post('/attendance', record);
            }
            localStorage.removeItem('offlineAttendance');
            alert('Offline data synced successfully!');
        } catch (err) {
            console.error('Sync failed', err);
            alert('Sync failed. Will try again later.');
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await api.get('/students');
            setStudents(res.data);
            const initialData = {};
            res.data.forEach(s => {
                initialData[s.id] = { status: 'Present', remarks: '' };
            });
            setAttendanceData(initialData);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAttendanceChange = (studentId, field, value) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [field]: value
            }
        }));
    };

    const submitAttendance = async () => {
        if (!navigator.onLine) {
            const newRecords = students.map(student => ({
                student_id: student.id,
                date: date,
                status: attendanceData[student.id]?.status || 'Present',
                remarks: attendanceData[student.id]?.remarks || ''
            }));

            const existing = JSON.parse(localStorage.getItem('offlineAttendance') || '[]');
            localStorage.setItem('offlineAttendance', JSON.stringify([...existing, ...newRecords]));
            alert('You are offline. Attendance saved locally and will sync when online.');
            return;
        }

        try {
            for (const student of students) {
                const data = attendanceData[student.id];
                await api.post('/attendance', {
                    student_id: student.id,
                    date: date,
                    status: data.status,
                    remarks: data.remarks
                });
            }
            alert('Attendance marked successfully!');
        } catch (err) {
            console.error(err);
            alert('Error marking attendance');
        }
    };

    return (
        <div className="page-container" style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0 }}>Mark Attendance</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => setIsScanning(!isScanning)}
                            className="btn-primary"
                            style={{ background: isScanning ? '#ef4444' : 'linear-gradient(135deg, #0ea5e9, #2563eb)' }}
                        >
                            {isScanning ? '⏹️ Stop Scan' : '📷 Scan QR'}
                        </button>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{ width: 'auto' }}
                        />
                    </div>
                </div>

                {isScanning && (
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <div id="reader" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}></div>
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {students.map((student) => (
                        <div key={student.id} style={itemStyle}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{student.name}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {student.roll_number} • Class {student.class_grade}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', flex: 2 }}>
                                <select
                                    value={attendanceData[student.id]?.status || 'Present'}
                                    onChange={(e) => handleAttendanceChange(student.id, 'status', e.target.value)}
                                    style={{
                                        flex: 1,
                                        ...getStatusColor(attendanceData[student.id]?.status)
                                    }}
                                >
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                    <option value="Late">Late</option>
                                </select>
                                <input
                                    type="text"
                                    value={attendanceData[student.id]?.remarks || ''}
                                    onChange={(e) => handleAttendanceChange(student.id, 'remarks', e.target.value)}
                                    placeholder="Remarks (optional)"
                                    style={{ flex: 2 }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                    <button onClick={submitAttendance} className="btn-primary">
                        💾 Save Attendance
                    </button>
                </div>
            </div>
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Present': return { borderColor: '#10b981', color: '#10b981' };
        case 'Absent': return { borderColor: '#ef4444', color: '#ef4444' };
        case 'Late': return { borderColor: '#f59e0b', color: '#f59e0b' };
        default: return {};
    }
};

const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)'
};

export default Attendance;
