document.addEventListener('DOMContentLoaded', () => {
    function getQueryParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    function getContacts() {
        return JSON.parse(localStorage.getItem('contacts')) || [];
    }

    const contactId = getQueryParam('id');
    if (!contactId) {
        alert('Контакт не знайдено');
        window.location.href = 'index.html';
        return;
    }

    const contacts = getContacts();
    const contact = contacts.find(c => c.id === contactId);

    if (!contact) {
        alert('Контакт не знайдено');
        window.location.href = 'index.html';
        return;
    }

    // Заповнюємо поля
    const photoEl = document.getElementById('contactPhoto');
    const avatarContainer = document.getElementById('avatarContainer');
    const fullNameEl = document.getElementById('contactFullName');
    const phoneEl = document.getElementById('contactPhone');
    const emailEl = document.getElementById('contactEmail');
    const discordEl = document.getElementById('contactDiscord');
    const telegramEl = document.getElementById('contactTelegram');
    const githubEl = document.getElementById('contactGitHub');
    const instagramEl = document.getElementById('contactInstagram');
    const editLink = document.getElementById('editContactLink');
    const deleteBtn = document.getElementById('deleteContactBtn');
    const descriptionEl = document.getElementById('contactDescription');



    fullNameEl.textContent = contact.fullName || 'Без імені';
    phoneEl.textContent = contact.phone || 'Номер телефону не вказаний';
    emailEl.textContent = contact.email || 'Gmail не вказаний';
    descriptionEl.textContent = contact.description || 'Опис не вказаний';



    if (contact.photo) {
        photoEl.src = contact.photo;
        photoEl.style.display = 'block';
        const initialDiv = avatarContainer.querySelector('.initial-letter');
        if (initialDiv) initialDiv.remove();
    } else {
        photoEl.style.display = 'none';
        if (!avatarContainer.querySelector('.initial-letter')) {
            const initialDiv = document.createElement('div');
            initialDiv.className = 'initial-letter w-[70px] h-[70px] rounded-[50px] bg-blue-400 flex items-center justify-center text-white font-bold text-[30px] select-none';
            initialDiv.textContent = contact.fullName ? contact.fullName[0].toUpperCase() : '?';
            avatarContainer.appendChild(initialDiv);
        }
    }

    function setupSocialIcon(el, url) {
        if (url) {
            el.style.opacity = '1';
            el.style.pointerEvents = 'auto';
            el.style.cursor = 'pointer';
            el.onclick = () => window.open(url, '_blank');
        } else {
            el.style.opacity = '0.4';
            el.style.pointerEvents = 'none';
            el.onclick = null;
        }
    }

    setupSocialIcon(discordEl, contact.discord);
    setupSocialIcon(telegramEl, contact.telegram);
    setupSocialIcon(githubEl, contact.github);
    setupSocialIcon(instagramEl, contact.instagram);

    editLink.href = `contactEdit.html?id=${contact.id}`;

    // Логіка для модалки видалення
    const deleteModal = document.getElementById('deleteModal');
    const modalDeleteBtn = document.getElementById('modalDeleteBtn');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const deleteSuccess = document.getElementById('deleteSuccess');

    // Відкриваємо модалку при кліку на кнопку видалення
    deleteBtn.addEventListener('click', () => {
        deleteModal.classList.remove('hidden');
    });

    // Закриваємо модалку при скасуванні
    modalCancelBtn.addEventListener('click', () => {
        deleteModal.classList.add('hidden');
    });

    // Видаляємо контакт при підтвердженні
    modalDeleteBtn.addEventListener('click', () => {
        const index = contacts.findIndex(c => c.id === contactId);
        if (index !== -1) {
            contacts.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }

        deleteModal.classList.add('hidden');
        deleteSuccess.classList.remove('hidden');

        setTimeout(() => {
            deleteSuccess.classList.add('hidden');
            window.location.href = 'index.html'; // Переходимо на головну після видалення
        }, 2000);
    });
});
