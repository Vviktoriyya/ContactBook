const btnSort = document.getElementById('btn-sort');
const sortMenu = document.getElementById('sortMenu');
const sortAZ = document.getElementById('sortAZ');
const sortZA = document.getElementById('sortZA');

btnSort.addEventListener('click', () => {
    sortMenu.classList.toggle('hidden');
});

sortAZ.addEventListener('click', () => {
    sortContacts(true);
    sortMenu.classList.add('hidden');
});

sortZA.addEventListener('click', () => {
    sortContacts(false);
    sortMenu.classList.add('hidden');
});

function sortContacts(isAZ = true) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    const uaLetters = 'абвгґдеєжзииіїйклмнопрстуфхцчшщьюя';

    function isUkrainian(char) {
        return uaLetters.includes(char.toLowerCase());
    }

    contacts.sort((a, b) => {
        const nameA = a.fullName.toLowerCase();
        const nameB = b.fullName.toLowerCase();

        const isA_UA = isUkrainian(nameA[0]);
        const isB_UA = isUkrainian(nameB[0]);

        if (isA_UA !== isB_UA) {
            return isAZ ? (isA_UA ? -1 : 1) : (isA_UA ? 1 : -1);
        }

        if (nameA < nameB) return isAZ ? -1 : 1;
        if (nameA > nameB) return isAZ ? 1 : -1;
        return 0;
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));
    currentContacts = contacts;
    currentPage = 1;
    renderContactsPage(currentContacts, currentPage);
}
