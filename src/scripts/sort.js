const btnSort = document.getElementById('btn-sort');
const sortMenu = document.getElementById('sortMenu');
const sortAZ = document.getElementById('sortAZ');
const sortZA = document.getElementById('sortZA');

// Показ/сховати меню
btnSort.addEventListener('click', () => {
    sortMenu.classList.toggle('hidden');
});

// Сортування
sortAZ.addEventListener('click', () => {
    sortContacts(true);
    sortMenu.classList.add('hidden');
});

sortZA.addEventListener('click', () => {
    sortContacts(false);
    sortMenu.classList.add('hidden');
});

// Функція сортування
function sortContacts(isAZ = true) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.sort((a, b) => {
        const nameA = a.fullName.toLowerCase();
        const nameB = b.fullName.toLowerCase();
        if (nameA < nameB) return isAZ ? -1 : 1;
        if (nameA > nameB) return isAZ ? 1 : -1;
        return 0;
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));
    currentContacts = contacts;  // Оновити поточний масив
    currentPage = 1;             // Повернутися на 1 сторінку після сортування
    renderContactsPage(currentContacts, currentPage);
}

