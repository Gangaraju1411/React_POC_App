import React from "react";
// import "./styles/App.css";

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const { name, email, phone, address } = contact;

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>Address:</strong> {address}
      </p>
      <div className="card-buttons">
        <button className="edit" onClick={() => onEdit(contact)}>
          Edit
        </button>
        <button onClick={() => onDelete(contact.id)} className="delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
