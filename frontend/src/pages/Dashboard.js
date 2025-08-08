import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ManageUsers.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      setStats({
        totalUsers: 150,
        activeUsers: 120,
        blockedUsers: 30,
        totalAnnonces: 45,
        publishedAnnonces: 35,
        draftAnnonces: 10,
      });
    };

    const fetchMessages = async () => {
      setMessages([
        {
          name: "John Doe",
          email: "john@example.com",
          content: "Please approve my account.",
          date: new Date().toISOString(),
        },
        {
          name: "Jane Smith",
          email: "jane@example.com",
          content: "Inquiry about announcement features.",
          date: new Date().toISOString(),
        },
      ]);
    };

    const fetchAnnonces = async () => {
      setAnnonces([
        {
          title: "JavaScript Basics",
          type: "Course",
          level: "Beginner",
          createdAt: new Date().toISOString(),
          owner: "John Doe",
        },
        {
          title: "Advanced Math Book",
          type: "Book",
          level: "Advanced",
          createdAt: new Date().toISOString(),
          owner: "Jane Smith",
        },
        {
          title: "Physics Test Prep",
          type: "Exam",
          level: "Intermediate",
          createdAt: new Date().toISOString(),
          owner: "Alex Brown",
        },
      ]);
    };

    fetchStats();
    fetchMessages();
    fetchAnnonces();
  }, []);

  if (!stats) return <div>Loading dashboard...</div>;

  return (
    <>
      <Header />
      <section className="manage-users-section">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">📊 Admin Dashboard</h2>

          {/* User Statistics */}
          <div className="mb-5">
            <h4 className="fw-semibold mb-3">👤 User Statistics</h4>
            <div className="row">
              {[
                { label: "Total Users", value: stats.totalUsers },
                { label: "Active Users", value: stats.activeUsers },
                { label: "Blocked Users", value: stats.blockedUsers },
              ].map((item, idx) => (
                <div key={idx} className="col-md-4 mb-3">
                  <div className="card shadow text-center p-3 h-100">
                    <h5>{item.label}</h5>
                    <p className="fw-bold fs-4">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Annonce Statistics */}
          <div className="mb-5">
            <h4 className="fw-semibold mb-3">📢 Annonce Statistics</h4>
            <div className="row">
              {[
                { label: "Total Annonces", value: stats.totalAnnonces },
                { label: "Published", value: stats.publishedAnnonces },
                { label: "Drafts", value: stats.draftAnnonces },
              ].map((item, idx) => (
                <div key={idx} className="col-md-4 mb-3">
                  <div className="card shadow text-center p-3 h-100">
                    <h5>{item.label}</h5>
                    <p className="fw-bold fs-4">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="mb-5">
            <h4 className="fw-semibold mb-3">📥 Recent Messages</h4>
            {messages.length === 0 ? (
              <p className="text-muted">No recent messages.</p>
            ) : (
              <div className="table-container shadow rounded">
                <table className="table table-striped mb-0 bg-white dark-table">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg, idx) => (
                      <tr key={idx}>
                        <td>{msg.name}</td>
                        <td>{msg.email}</td>
                        <td>{msg.content}</td>
                        <td>{new Date(msg.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Annonces */}
          <div className="mb-5">
            <h4 className="fw-semibold mb-3">📚 Recent Annonces</h4>
            {annonces.length === 0 ? (
              <p className="text-muted">No recent annonces.</p>
            ) : (
              <div className="table-container shadow rounded">
                <table className="table table-striped mb-0 bg-white dark-table">
                  <thead className="bg-success text-white">
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Level</th>
                      <th>Owner</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {annonces.map((annonce, idx) => (
                      <tr key={idx}>
                        <td>{annonce.title}</td>
                        <td>{annonce.type}</td>
                        <td>{annonce.level}</td>
                        <td>{annonce.owner}</td>
                        <td>{new Date(annonce.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
