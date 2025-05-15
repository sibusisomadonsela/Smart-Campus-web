import React from 'react';
import { FaHome, FaDoorOpen, FaUsers, FaBullhorn, FaChartBar, FaChartLine, FaCommentDots, FaBell, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';
import {useState, useEffect} from 'react';
import { getUsers } from '../services/backService';
const sidebarLinks = [
  { icon: <FaHome />, label: 'Dashboard' },
  { icon: <FaDoorOpen />, label: 'Room Bookings' },
  { icon: <FaUsers />, label: 'Users' },
  { icon: <FaBullhorn />, label: 'Announcements' },
  { icon: <FaChartBar />, label: 'Reports' },
  { icon: <FaChartLine />, label: 'Analytics' },
  { icon: <FaCommentDots />, label: 'Notifications' },
];

const Dashboard = () => {

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
        getUsersList();
    }, []);

    const getUsersList = async () => {
        const users = await getUsers();
        setUsers(users.data);
    }

    const cardData = [
      { label: 'Room Bookings', value: 5 },
      { label: 'Users', value: users.length},
      { label: 'Announcements', value: 3 },
      { label: 'Reports', value: 1 },
    ];

    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fb' }}>
        {/* Sidebar */}
        <div style={{ width: 270, background: '#232f3e', color: '#fff', display: 'flex', flexDirection: 'column', padding: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 28, padding: '36px 0 32px 32px', letterSpacing: 0.5 }}>
            Admin<br />Dashboard
          </div>
          <div style={{ flex: 1 }}>
            {sidebarLinks.map((link, idx) => (
              <div
                key={link.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  margin: '0 0 8px 0',
                  padding: '12px 32px',
                  background: idx === 0 ? '#32405a' : 'none',
                  borderRadius: 10,
                  fontWeight: idx === 0 ? 700 : 500,
                  fontSize: 18,
                  cursor: 'pointer',
                  color: '#fff',
                  transition: 'background 0.2s',
                }}
              >
                <span style={{ fontSize: 20 }}>{link.icon}</span>
                {link.label}
              </div>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div style={{ flex: 1, padding: 40, minHeight: '100vh' }}>
          {/* Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#232f3e' }}>Welcome, {user?.firstName} {user?.lastName}!</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <FaBell size={22} style={{ color: '#232f3e', cursor: 'pointer' }} />
              <FaQuestionCircle size={22} style={{ color: '#232f3e', cursor: 'pointer' }} />
              <FaUserCircle size={28} style={{ color: '#232f3e', cursor: 'pointer' }} />
            </div>
          </div>
          {/* Summary Cards */}
          <div style={{ display: 'flex', gap: 28, marginBottom: 32 }}>
            {cardData.map(card => (
              <div key={card.label} style={{ flex: 1, background: '#fff', color: '#232f3e', borderRadius: 14, padding: '28px 0', textAlign: 'center', minWidth: 140, boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{card.label}</div>
                <div style={{ fontSize: 38, fontWeight: 700 }}>{card.value}</div>
              </div>
            ))}
          </div>
          {/* Main Cards Row */}
          <div style={{ display: 'flex', gap: 28, marginBottom: 32 }}>
            <div style={{ flex: 1, background: '#fff', color: '#232f3e', borderRadius: 14, padding: 28, minHeight: 180, boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 18 }}>Booking Notifications</div>
              <div style={{ height: 10, background: '#e3eafc', borderRadius: 4, marginBottom: 18, width: '80%' }}></div>
              <div style={{ height: 10, background: '#e3eafc', borderRadius: 4, marginBottom: 18, width: '60%' }}></div>
              <div style={{ height: 10, background: '#e3eafc', borderRadius: 4, marginBottom: 18, width: '70%' }}></div>
              <div style={{ height: 10, background: '#e3eafc', borderRadius: 4, marginBottom: 18, width: '50%' }}></div>
            </div>
            <div style={{ flex: 1, background: '#fff', color: '#232f3e', borderRadius: 14, padding: 28, minHeight: 180, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 18 }}>System Performance</div>
              {/* SVG line graph as a placeholder */}
              <svg width="100%" height="80" viewBox="0 0 200 80">
                <polyline
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="4"
                  points="0,60 40,30 80,50 120,20 160,60 200,75"
                />
              </svg>
            </div>
          </div>
          {/* Lower Section: Dropdowns and Cards */}
          <div style={{ display: 'flex', gap: 28 }}>
            <div style={{ flex: 2, display: 'flex', gap: 16 }}>
              <select style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e3eafc', fontSize: 16, color: '#232f3e', background: '#fff' }}>
                <option>Room</option>
              </select>
              <select style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e3eafc', fontSize: 16, color: '#232f3e', background: '#fff' }}>
                <option>12</option>
              </select>
              <select style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e3eafc', fontSize: 16, color: '#232f3e', background: '#fff' }}>
                <option>Aprust</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 28, marginTop: 24 }}>
            <div style={{ flex: 1, background: '#fff', color: '#232f3e', borderRadius: 14, padding: 28, minHeight: 120, boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
              <div style={{ height: 10, background: '#e3eafc', borderRadius: 4, marginBottom: 18, width: '80%' }}></div>
              <div style={{ height: 10, background: '#e3eafc', borderRadius: 4, marginBottom: 18, width: '60%' }}></div>
              <div style={{ height: 10, background: '#e3eafc', borderRadius: 4, marginBottom: 18, width: '70%' }}></div>
              <div style={{ height: 10, background: '#e3eafc', borderRadius: 4, marginBottom: 18, width: '50%' }}></div>
            </div>
            <div style={{ flex: 1, background: '#fff', color: '#232f3e', borderRadius: 14, padding: 28, minHeight: 120, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
              <svg width="100%" height="60" viewBox="0 0 200 60">
                <polyline
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="4"
                  points="0,40 40,20 80,30 120,10 160,40 200,55"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;