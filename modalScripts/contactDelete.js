function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const contactId = getQueryParam('id');

const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const deleteModal = document.getElementById('deleteModal');
const modalDeleteBtn = document.getElementById('modalDeleteBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const deleteSuccess = document.getElementById('deleteSuccess');

if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
        deleteModal.classList.remove('hidden');
    });
}

modalCancelBtn?.addEventListener('click', () => {
    deleteModal.classList.add('hidden');
});

modalDeleteBtn?.addEventListener('click', () => {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const index = contacts.findIndex(c => c.id === contactId);

    if (index !== -1) {
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    deleteModal.classList.add('hidden');
    deleteSuccess.classList.remove('hidden');

    setTimeout(() => {
        deleteSuccess.classList.add('hidden');
        window.location.href = 'index.html';
    }, 2000);
});
