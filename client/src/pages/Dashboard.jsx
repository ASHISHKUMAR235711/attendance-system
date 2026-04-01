import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="page-container">
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome Back 👋</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Manage your rural school's daily operations efficiently.</p>
            </header>

            <div className="grid-layout">
                <Link to="/students" style={{ textDecoration: 'none' }}>
                    <div className="glass-panel" style={cardStyle}>
                        <div style={iconContainerStyle}>👥</div>
                        <h3 style={titleStyle}>Manage Students</h3>
                        <p style={descStyle}>Add, view, and update student profiles with ease.</p>
                    </div>
                </Link>

                <Link to="/attendance" style={{ textDecoration: 'none' }}>
                    <div className="glass-panel" style={cardStyle}>
                        <div style={iconContainerStyle}>📅</div>
                        <h3 style={titleStyle}>Mark Attendance</h3>
                        <p style={descStyle}>Track daily attendance and generate reports.</p>
                    </div>
                </Link>

                <div className="glass-panel" style={cardStyle}>
                    <div style={iconContainerStyle}>📊</div>
                    <h3 style={titleStyle}>Reports</h3>
                    <p style={descStyle}>Visualize attendance trends and analytics (Coming Soon).</p>
                </div>
            </div>
        </div>
    );
};

const cardStyle = {
    padding: '2rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
    transition: 'transform 0.3s ease, background 0.3s ease',
    cursor: 'pointer',
};

const iconContainerStyle = {
    fontSize: '2.5rem',
    background: 'rgba(59, 130, 246, 0.1)',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    marginBottom: '0.5rem',
};

const titleStyle = {
    fontSize: '1.5rem',
    margin: 0,
};

const descStyle = {
    color: 'var(--text-secondary)',
    margin: 0,
    lineHeight: '1.5',
};

export default Dashboard;
