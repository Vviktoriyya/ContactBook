// js/storage.js
const STORAGE_KEY = 'contacts';

function getContacts() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveContacts(contacts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

function addContact(contact) {
    const contacts = getContacts();
    contacts.push(contact);
    saveContacts(contacts);
}
