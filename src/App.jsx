import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";
import { getContacts, saveContacts } from "./localStorage";
import "./styles/App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editableContact, setEditableContact] = useState(null);

  const [isInitialized, setIsInitialized] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedContacts = getContacts();
    setContacts(storedContacts);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveContacts(contacts);
      console.log("Saving to localStorage:", contacts);
    }
  }, [contacts, isInitialized]);

  // ✅ Load contacts once on initial render
  // useEffect(() => {
  //   const storedContacts = getContacts();
  //   console.log("Loaded from localStorage:", storedContacts);

  //   setContacts(storedContacts);
  // }, []);

  // ✅ Save contacts whenever they change
  // useEffect(() => {
  //   saveContacts(contacts);
  //   console.log("Saving to localStorage:", contacts);
  // }, [contacts]);

  const addOrUpdateContact = (contact) => {
    const uniqueId = Date.now().toString(); // ✅ simpler + compatible

    if (contact.id) {
      setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
    } else {
      setContacts([...contacts, { ...contact, id: uniqueId }]);
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleEdit = (contact) => {
    setEditableContact(contact);
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      {/* Header with logo */}
      <div className="header">
        <img src="/tp.jpg" alt="Logo" className="logo" />
        <h1 className="title">Contact Manager</h1>
      </div>
      <div className="search-bar-container">
        <div className="search-bar-wrapper">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="toggle-form-wrapper">
          <button
            className="toggle-form"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Add New Contact"}
          </button>
        </div>
      </div>

      {/* Lazy Loaded Contact Form */}
      {showForm && (
        <ContactForm onSubmit={addOrUpdateContact} editable={editableContact} />
      )}
      {/* <ContactForm onSubmit={addOrUpdateContact} editable={editableContact} /> */}

      {/* Contact List Scrollable Section */}
      <div className="scrollable-contact-list">
        <ContactList
          contacts={filteredContacts}
          onDelete={deleteContact}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default App;
