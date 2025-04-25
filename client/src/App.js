import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const API_URL = "http://localhost:5000/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // const fetchUsers = async () => {
  //   const res = await fetch(API_URL);
  //   const data = await res.json();
  //   setUsers(data);
  // };

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error("API did not return an array");
      }
      setUsers(data);
    } catch (error) {
      console.error("Fetch users failed:", error);
      setUsers([]); // or show error message to user
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (user) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const newUser = await res.json();
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = async (user) => {
    const res = await fetch(`${API_URL}/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const updated = await res.json();
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    setEditingUser(null);
  };

  const deleteUser = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>User Management</h1>
      <UserForm
        onSubmit={editingUser ? updateUser : createUser}
        editingUser={editingUser}
      />
      <UserList users={users} onEdit={setEditingUser} onDelete={deleteUser} />
    </div>
  );
}

export default App;
