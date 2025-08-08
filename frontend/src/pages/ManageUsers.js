import React, { useEffect, useState } from 'react';
import {
  fetchAllUsers,
  deleteUserById,
  updateUserById
} from '../api/ManageUsers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/ManageUsers.css';

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:8080${url}`;
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'USER',
    status: 'active',
    image: null,
  });

  useEffect(() => {
    fetchUsers();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setEditingUser(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserById(id);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      role: user.role || 'USER',
      status: user.active ? 'active' : 'inactive',
      image: null,
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = new FormData();
      updatedUser.append('firstName', formData.firstName);
      updatedUser.append('lastName', formData.lastName);
      updatedUser.append('email', formData.email);
      updatedUser.append('role', formData.role);
      updatedUser.append('active', formData.status === 'active');
      if (formData.image) updatedUser.append('image', formData.image);

      await updateUserById(editingUser.id, updatedUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.role?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Header />

      <section className="manage-users-section">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">👥 Manage Users</h2>

          <div className="mb-4 d-flex justify-content-end">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search by name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredUsers.length === 0 ? (
            <p className="text-center text-muted">No users found.</p>
          ) : (
            <div className="table-responsive shadow rounded">
              <table className="table table-striped align-middle mb-0 bg-white dark-table">
                <thead className="bg-primary text-white">
                  <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>
                        {user.imageUrl ? (
                          <img
                            src={getImageUrl(user.imageUrl)}
                            alt="Profile"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              objectFit: "cover"
                            }}
                          />
                        ) : (
                          <div
                            className="bg-light text-secondary d-flex align-items-center justify-content-center rounded-circle"
                            style={{ width: '40px', height: '40px', fontSize: '10px' }}
                          >
                            No Img
                          </div>
                        )}
                      </td>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td className="text-capitalize">{user.role || 'N/A'}</td>
                      <td>
                        <span className={`badge ${user.active ? 'bg-success' : 'bg-secondary'}`}>
                          {user.active ? 'Active' : 'Blocked'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {editingUser && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={() => setEditingUser(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Blocked</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ManageUsers;
