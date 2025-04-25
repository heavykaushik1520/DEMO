import React, { useEffect, useState } from "react";

function UserForm({ onSubmit, editingUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    const user = {
      name,
      email,
      id: editingUser?.id,
    };
    onSubmit(user);
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type="email"
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <button type="submit">
        {editingUser ? "Update User" : "Create User"}
      </button>
    </form>
  );
}

export default UserForm;
