export const getContacts = () => {
  const contacts = localStorage.getItem("contacts");
  return contacts ? JSON.parse(contacts) : [];
};

// export const saveContacts = (contacts) => {
//   localStorage.setItem("contacts", JSON.stringify(contacts));
// };

export const saveContacts = (contacts) => {
  if (!Array.isArray(contacts) || contacts.length === 0) return;
  localStorage.setItem("contacts", JSON.stringify(contacts));
};
