// src/components/ContactForm.jsx
import React, { useState, useEffect } from "react";
import { validateEmail, validatePhone } from "../utils/validators";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const ContactForm = ({ onSubmit, editable }) => {
  const [contact, setContact] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editable) {
      setContact(editable);
    }
  }, [editable]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!validateEmail(contact.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!validatePhone(contact.phone)) {
      newErrors.phone = "Phone number should be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(contact);
    setContact(initialState);
    setErrors({});
  };

  return (
    <>
      <h2>{editable ? "Edit Contact" : "Add Contact"}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={contact.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={contact.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={contact.address}
          onChange={handleChange}
        />
        <button type="submit">{editable ? "Update" : "Add"}</button>
      </form>
    </>
  );
};

export default ContactForm;
