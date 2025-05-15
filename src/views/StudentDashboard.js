import React from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FaCalendarAlt, FaDoorOpen, FaPlus, FaTimes, FaBell, FaTools, FaUserCog, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const sidebarLinks = [
  { icon: <FaCalendarAlt />, label: 'My Timetable' },
  { icon: <FaDoorOpen />, label: 'View Available Rooms' },
  { icon: <FaPlus />, label: 'Book a Room' },
  { icon: <FaTimes />, label: 'Cancel Booking' },
  { icon: <FaBell />, label: 'Notifications' },
  { icon: <FaTools />, label: 'Report Mainenance Issue' },
  { icon: <FaUserCog />, label: 'Update Login Details' },
];

const StudentDashboard = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fb' }}>
      {/* Sidebar */}
      <div style={{ width: 270, background: '#232f3e', color: '#fff', display: 'flex', flexDirection: 'column', padding: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 20, padding: '32px 0 24px 32px', letterSpacing: 0.5 }}>
          Smart Campus Services Portal
        </div>
        <div style={{ flex: 1 }}>
          {sidebarLinks.map((link, idx) => (
            <div
              key={link.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 0 14px 32px',
                background: idx === 0 ? '#32405a' : 'none',
                fontWeight: idx === 0 ? 600 : 500,
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              <span style={{ marginRight: 16, fontSize: 18 }}>{link.icon}</span>
              {link.label}
            </div>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, padding: 32 }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 600 }}>
            Welcome {user?.firstName} {user?.lastName}!
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <FaBell size={20} style={{ color: '#232f3e', cursor: 'pointer' }} />
            <FaUserCircle size={28} style={{ color: '#232f3e', cursor: 'pointer' }} />
          </div>
        </div>
        {/* Cards Row */}
        <Row className="mb-4" style={{ gap: 0 }}>
          <Col md={3}>
            <Card style={{ borderRadius: 14, minHeight: 90 }} className="mb-3">
              <Card.Body>
                <div style={{ fontWeight: 600, fontSize: 16 }}>Upcoming Classes</div>
                <div style={{ fontSize: 15, marginTop: 8 }}>Tue, Apr 23<br />Calculus</div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>10:30 AM – 11:30 AM</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ borderRadius: 14, minHeight: 90 }} className="mb-3">
              <Card.Body>
                <div style={{ fontWeight: 600, fontSize: 16 }}>Next Room  Booking</div>
                <div style={{ fontSize: 15, marginTop: 8 }}>Apr 24<br />Study Room 2</div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>3:00 PM + 5:00 PM</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ borderRadius: 14, minHeight: 90 }} className="mb-3">
              <Card.Body>
                <div style={{ fontWeight: 600, fontSize: 16 }}>Maintenance Reports</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>2 Submitted</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Room Booking and Notifications */}
        <Row>
          <Col md={6}>
            <Card style={{ borderRadius: 14, minHeight: 340 }} className="mb-3">
              <Card.Body>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 12 }}>Room Booking</div>
                {/* Calendar Picker */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ marginBottom: 16 }}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={date => setSelectedDate(date)}
                      inline
                      calendarClassName="w-100"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 16, width: '100%' }}>
                    <Form.Select size="sm" style={{ maxWidth: 110 }}>
                      <option>Date</option>
                    </Form.Select>
                    <Form.Select size="sm" style={{ maxWidth: 110 }}>
                      <option>Building</option>
                    </Form.Select>
                    <Form.Select size="sm" style={{ maxWidth: 110 }}>
                      <option>Time</option>
                    </Form.Select>
                    <Form.Select size="sm" style={{ maxWidth: 110 }}>
                      <option>Capacity</option>
                    </Form.Select>
                  </div>
                  <Button style={{ width: '100%', background: '#2563eb', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16 }}>
                    Book Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={{ borderRadius: 14, minHeight: 340 }} className="mb-3">
              <Card.Body>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 12 }}>Notifications</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 10, height: 10, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
                    Booking confirmed for Study Room 1
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 10, height: 10, background: '#2563eb', borderRadius: '50%', display: 'inline-block' }}></span>
                    Class rescheduled: Computer Science on Apr 25, 1:00 PM
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 10, height: 10, background: '#f59e42', borderRadius: '50%', display: 'inline-block' }}></span>
                    Campus event: Guest lecture on Apr 23
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StudentDashboard;
