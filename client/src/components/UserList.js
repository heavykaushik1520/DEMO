import React from "react";

function UserList({ users, onEdit, onDelete }) {
  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 && <p>No users yet.</p>}
      <ul style={{ padding: 0, listStyle: "none" }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <strong>{user.name}</strong> <br />
            <span>{user.email}</span>
            <br />
            <button onClick={() => onEdit(user)} style={{ marginRight: "1rem" }}>
              Edit
            </button>
            <button onClick={() => onDelete(user.id)} style={{ color: "red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
