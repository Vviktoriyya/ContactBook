const contactsPerPage = 6;
let currentPage = 1;
let currentContacts = [];

function getContactsFromStorage() {
    try {
        const data = localStorage.getItem('contacts');
        const contacts = data ? JSON.parse(data) : [];
        return Array.isArray(contacts) ? contacts : [];
    } catch (e) {
        console.error('Помилка парсингу contacts з localStorage:', e);
        return [];
    }
}

function renderContactsPage(contacts, page = 1) {
    currentContacts = contacts;
    currentPage = page;

    const container = document.getElementById('results-container');
    container.innerHTML = '';

    if (contacts.length === 0) {
        container.innerHTML = '<p class="text-gray-600 text-center">Контактів ще немає.</p>';
        document.getElementById('pagination').innerHTML = '';
        return;
    }

    const start = (page - 1) * contactsPerPage;
    const end = start + contactsPerPage;
    const pageContacts = contacts.slice(start, end);

    pageContacts.forEach(contact => {
        const a = document.createElement('a');
        a.href = 'contactInfo.html?id=' + contact.id;
        a.className = 'w-full rounded-[10px] flex items-center min-h-[70px] gap-[10px] border-2 bg-white hover:bg-blue-100 hover:border-gray-500 border-gray-400 px-[20px]';

        const avatarHTML = contact.photo
            ? `<img src="${contact.photo}" alt="" class="w-[40px] h-[40px] object-cover rounded-full" />`
            : `<div class="w-[40px] h-[40px] rounded-full bg-blue-400 text-white flex items-center justify-center text-[20px] font-bold uppercase">
                 ${contact.fullName ? contact.fullName[0].toUpperCase() : '?'}
               </div>`;

        a.innerHTML = `
          <div class="flex cursor-pointer justify-between items-center flex-1 min-w-0">
            <div class="flex items-center gap-[10px] min-w-0">
              <div class="rounded-full border-2 border-gray-400 bg-gray-400 flex-shrink-0 overflow-hidden">
                ${avatarHTML}
              </div>
              <div class="flex items-center px-[10px] w-[220px] py-[2px] border-2 bg-blue-50 border-gray-400 rounded-[10px] min-w-0">
                <p class="truncate whitespace-nowrap overflow-hidden m-0">${contact.fullName || ''}</p>
              </div>
            </div>
            <div>
              <div class="flex justify-center items-center px-[10px] w-[150px] bg-blue-50 py-[2px] border-2 border-gray-400 rounded-[10px] min-w-0">
                <p class="truncate whitespace-nowrap overflow-hidden m-0">${contact.phone || ''}</p>
              </div>
            </div>
          </div>
        `;

        container.appendChild(a);
    });

    renderPagination(contacts.length, page);
}

function renderPagination(totalContacts, page) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalContacts / contactsPerPage);

    if (totalPages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Назад';
    prevBtn.disabled = page === 1;
    prevBtn.className = 'px-3 py-1 mr-2 rounded bg-gray-200 disabled:opacity-50 cursor-pointer';
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            renderContactsPage(currentContacts, currentPage - 1);
        }
    });

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Вперед →';
    nextBtn.disabled = page === totalPages;
    nextBtn.className = 'px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer';
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            renderContactsPage(currentContacts, currentPage + 1);
        }
    });

    const pageInfo = document.createElement('span');
    pageInfo.textContent = `Сторінка ${page} з ${totalPages}`;
    pageInfo.className = 'mx-2 text-gray-700';

    paginationContainer.appendChild(prevBtn);
    paginationContainer.appendChild(pageInfo);
    paginationContainer.appendChild(nextBtn);
}

document.addEventListener('DOMContentLoaded', () => {
    currentContacts = getContactsFromStorage();
    currentPage = 1;
    renderContactsPage(currentContacts, currentPage);
});

document.getElementById('search-input').addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    const contacts = getContactsFromStorage();

    if (!query) {
        currentContacts = contacts;
        currentPage = 1;
        renderContactsPage(currentContacts, currentPage);
        return;
    }

    currentContacts = contacts.filter(c => {
        return (
            c.fullName?.toLowerCase().includes(query) ||
            c.phone?.toLowerCase().includes(query) ||
            c.email?.toLowerCase().includes(query) ||
            c.telegram?.toLowerCase().includes(query) ||
            c.github?.toLowerCase().includes(query) ||
            c.discord?.toLowerCase().includes(query) ||
            c.instagram?.toLowerCase().includes(query) ||
            c.description?.toLowerCase().includes(query)
        );
    });

    currentPage = 1;
    renderContactsPage(currentContacts, currentPage);
});

document.getElementById('btn-clear').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
    currentPage = 1;
    currentContacts = getContactsFromStorage();
    renderContactsPage(currentContacts, currentPage);
    searchInput.focus();
});
const toastMessage = localStorage.getItem("toastMessage");
if (toastMessage) {
    showToast(toastMessage);
    localStorage.removeItem("toastMessage");
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md animate-fade-in-out z-50";
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}