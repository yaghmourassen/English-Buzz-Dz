// src/api/ManageUsers.js

export const fetchAllUsers = async () => {
  const res = await fetch('http://localhost:8080/api/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const deleteUserById = async (id) => {
  const res = await fetch(`http://localhost:8080/api/users/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete user');
};
export const updateUserById = async (id, formData) => {
  const res = await fetch(`http://localhost:8080/api/users/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error('Failed to update user: ' + errText);
  }

  return res.json();
};

