import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav style={styles.nav} className="glass-panel">
            <div style={styles.logoContainer}>
                <div style={styles.logoIcon}>🎓</div>
                <h1 style={styles.logo}>RuralAttendance</h1>
            </div>
            <ul style={styles.ul}>
                <NavLink to="/" current={location.pathname}>Dashboard</NavLink>
                <NavLink to="/students" current={location.pathname}>Students</NavLink>
                <NavLink to="/attendance" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    Attendance
                </NavLink>
                <NavLink to="/qrcodes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    QR Codes
                </NavLink>
            </ul>
        </nav>
    );
};

const NavLink = ({ to, current, children }) => {
    const isActive = current === to;
    return (
        <li>
            <Link
                to={to}
                style={{
                    ...styles.link,
                    background: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                    color: isActive ? '#60a5fa' : 'var(--text-secondary)',
                }}
            >
                {children}
            </Link>
        </li>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        marginBottom: '2rem',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    logoIcon: {
        fontSize: '1.8rem',
        background: 'linear-gradient(135deg, #3b82f6, #10b981)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    logo: {
        margin: 0,
        fontSize: '1.5rem',
        fontWeight: '800',
        background: 'linear-gradient(to right, #fff, #94a3b8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    ul: {
        listStyle: 'none',
        display: 'flex',
        gap: '10px',
        margin: 0,
        padding: 0,
    },
    link: {
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontWeight: '600',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
    }
};

export default Navbar;
