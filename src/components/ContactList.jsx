import React from "react";
import ContactCard from "./ContactCard";

const ContactList = ({ contacts, onEdit, onDelete }) => {
  if (contacts.length === 0) {
    return <p>No contacts found.</p>;
  }

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ContactList;
