// Функція для отримання параметра з URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Отримуємо contactId
const contactId = getQueryParam('id');

// Елементи DOM
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn'); // Кнопка "Видалити" на сторінці
const deleteModal = document.getElementById('deleteModal'); // Модалка підтвердження видалення
const modalDeleteBtn = document.getElementById('modalDeleteBtn'); // Кнопка "Видалити" в модалці
const modalCancelBtn = document.getElementById('modalCancelBtn'); // Кнопка "Скасувати" в модалці
const deleteSuccess = document.getElementById('deleteSuccess'); // Повідомлення про успіх

// Перевірка чи існує кнопка confirmDeleteBtn
if (confirmDeleteBtn) {
    // Відкриваємо модалку при кліку на confirmDeleteBtn
    confirmDeleteBtn.addEventListener('click', () => {
        deleteModal.classList.remove('hidden');
    });
}

// Закриваємо модалку при кліку на "Скасувати"
modalCancelBtn?.addEventListener('click', () => {
    deleteModal.classList.add('hidden');
});

// Видаляємо контакт і показуємо повідомлення при кліку на "Видалити" в модалці
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
        window.location.href = 'index.html'; // Переходимо на головну
    }, 2000);
});
