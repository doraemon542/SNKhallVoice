import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/SubmittedCom.css';

const DissatisfiedCom = () => {
  const navigate = useNavigate();
  
    const [complaints, setComplaints] = useState([]);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  
  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3000/auth/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/login');
        }
      }).catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/complaints?status=dissatisfied', { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const sortedComplaints = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setComplaints(sortedComplaints)
        
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/complaints/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the state with the updated complaint
      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint._id !== id)
      );
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };
  return (
    <div>
      <header className={isHeaderSticky ? "sticky" : ""}>
        <div className="logoandsearch">
          <div className="snk-logo">
            <span>SNK</span>
            <div className="hallvoice">
              Hall <div className="voice">Voice</div>
            </div>
          </div>
        </div>
        <nav>
          <ul>
          <li><Link to="/adminhome">HOME</Link></li>
          <li><Link to="/report">REPORT</Link></li>
          <li><Link to="/userinfo">USERS INFORMATION</Link></li>
          <li><Link to="/usercomplaint">USERS COMPLAINT</Link></li>
          <li><Link to="/adminprofile">MY PROFILE</Link></li>
          <li><a  className="logout-btn" onClick={handleLogout}><button>LogOut</button></a></li>
          </ul>
        </nav>
      </header>
      <img 
        src="image/onnn.jpg" 
        alt="Your Image" 
        style={{ 
          width: '100%', 
          height: '38vh', 
          objectFit: 'cover', 
          objectPosition: 'center' 
        }} 
      />

      <div className="table" id="users_table">
        <section className="table__header">
          <h2>DISSATISFIED COMPLAINTS:</h2>
          <div className="input-container">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search..." />
          </div>
        </section>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Room Number</th>
                <th>Complaint Description</th>
                <th>Date</th>
                <th>Send to in process</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint.studentID}</td>
                  <td>{complaint.roomNumber}</td>
                  <td>{complaint.complaint}</td>
                  <td>{new Date(complaint.date).toLocaleString()}</td>
                  <td>
                    <button
                      className="delete-row"
                      onClick={() => handleStatusUpdate(complaint._id, 'submitted')}
                    >
                      Send to Submitted
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

    </div>
  )
}

export default DissatisfiedCom