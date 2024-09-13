import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function AdminProfile() {
  const navigate = useNavigate();
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [activeTab, setActiveTab] = useState("account-general");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setIsHeaderSticky(window.scrollY > 0);
  };

  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3000/auth/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/login');
        }
      }).catch(err => {
        console.log(err.response || err);
      });
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <header className={isHeaderSticky ? "sticky" : ""}>
        <div className="logoandsearch">
          <div className="snk-logo">
            <span>SNK</span>
            <div className="hallvoice">
              Hall <div className="voice"> Voice</div>
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
            <li><a className="logout-btn" onClick={handleLogout}><button>LogOut</button></a></li>
          </ul>
        </nav>
      </header>

      <div className="contai">
        <h4 className="font-weight-bold py-3 mb-4">
          Account settings
        </h4>
        <div className="card overflow-hidden">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-3 pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <a
                  className={`list-group-item list-group-item-action ${activeTab === "account-general" ? "active" : ""}`}
                  onClick={() => handleTabClick("account-general")}
                >
                  General
                </a>
                <a
                  className={`list-group-item list-group-item-action ${activeTab === "account-change-password" ? "active" : ""}`}
                  onClick={() => handleTabClick("account-change-password")}
                >
                  Change password
                </a>
                <a
                  className={`list-group-item list-group-item-action ${activeTab === "account-info" ? "active" : ""}`}
                  onClick={() => handleTabClick("account-info")}
                >
                  Info
                </a>
                <a
                  className={`list-group-item list-group-item-action ${activeTab === "account-social-links" ? "active" : ""}`}
                  onClick={() => handleTabClick("account-social-links")}
                >
                  Social links
                </a>
                <a
                  className={`list-group-item list-group-item-action ${activeTab === "account-notifications" ? "active" : ""}`}
                  onClick={() => handleTabClick("account-notifications")}
                >
                  Notifications
                </a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                {activeTab === "account-general" && (
                  <div className="tab-pane fade active show" id="account-general">
                    <div className="card-body media align-items-center">
                      <img src="image/admin.png" alt="Admin" className="d-block ui-w-80" />
                      <div className="media-body ml-4">
                        <label className="btn btn-outline-primary">
                          Upload new photo
                          <input type="file" className="account-settings-fileinput" />
                        </label> &nbsp;
                        <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                        <div className="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control mb-1" value="Admin_username" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value="Admin_name" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">E-mail</label>
                        <input type="text" className="form-control mb-1" value="admin@gmail.com" />
                        <div className="alert alert-warning mt-3">
                          Your email is not confirmed. Please check your inbox.<br />
                          <a href="javascript:void(0)">Resend confirmation</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "account-change-password" && (
                  <div className="tab-pane fade active show" id="account-change-password">
                    <div className="card-body pb-2">
                      <div className="form-group">
                        <label className="form-label">Current password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">New password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Repeat new password</label>
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "account-info" && (
                  <div className="tab-pane fade active show" id="account-info">
                    <div className="card-body pb-2">
                      <div className="form-group">
                        <label className="form-label">Bio</label>
                        <textarea className="form-control" rows="5">
                          Group no A208. Roll-2004041,2004044,2004045
                        </textarea>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Admin Category</label>
                        <select className="custom-select">
                          <option selected>Complaint Management</option>
                          <option>Graduated Student Management</option>
                        </select>
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body pb-2">
                      <h6 className="mb-4">Contacts</h6>
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" value="+880 1765545772" />
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "account-social-links" && (
                  <div className="tab-pane fade active show" id="account-social-links">
                    <div className="card-body pb-2">
                      {/* Social links form content here */}
                    </div>
                  </div>
                )}
                {activeTab === "account-notifications" && (
                  <div className="tab-pane fade active show" id="account-notifications">
                    <div className="card-body pb-2">
                      <h6 className="mb-4">Activity</h6>
                      <div className="form-group">
                        <label className="switcher">
                          <input type="checkbox" className="switcher-input" defaultChecked />
                          <span className="switcher-indicator">
                            <span className="switcher-yes"></span>
                            <span className="switcher-no"></span>
                          </span>
                          <span className="switcher-label">Notify me when a new complaint is received</span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input type="checkbox" className="switcher-input" defaultChecked />
                          <span className="switcher-indicator">
                            <span className="switcher-yes"></span>
                            <span className="switcher-no"></span>
                          </span>
                          <span className="switcher-label">Send me notifications for new comments</span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input type="checkbox" className="switcher-input" />
                          <span className="switcher-indicator">
                            <span className="switcher-yes"></span>
                            <span className="switcher-no"></span>
                          </span>
                          <span className="switcher-label">Email me when a new report is generated</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul className="social-icon">
          <li className="menu__item"><a className="menu__link" href="#">JOIN US ON:</a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#"><i className="fab fa-facebook"></i></a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#"><i className="fab fa-twitter"></i></a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#"><i className="fab fa-linkedin"></i></a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#"><i className="fab fa-instagram"></i></a></li>
        </ul>
        <ul className="menu">
          <li className="menu__item"><a className="menu__link" href="#">ABOUT US: SNK Hall Voice is a dedicated application designed to swiftly and efficiently handle student grievances while maintaining a commitment to continual improvement. Emphasizing user-friendliness, its primary objective is to optimize the resolution of complaints within the Shamsunnahar Khan Hall at Chittagong University of Engineering and Technology.</a></li>
        </ul>
        
      
            <hr className="separator" />
            <div className="copyright">
                <p>&copy; 2024 Hall Complaint Project. All rights reserved.</p>
            </div>
        </footer>
      
    </div>
  );
}

export default AdminProfile;
