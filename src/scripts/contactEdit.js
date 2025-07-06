// Отримуємо параметр id з URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const contactId = getQueryParam('id');
const img = document.getElementById('previewImage');
const photoInput = document.getElementById('photoInputEdit');

// Регулярки для перевірки
const nameRegex = /^[А-Яа-яЁёЇїІіЄєҐґA-Za-z\s'-]*$/;
const phoneRegex = /^\d+$/;
const emailStrictRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

// Елементи для виводу помилок
const fullNameInput = document.getElementById('fullName');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const descriptionInput = document.getElementById('description');
const instagramInput = document.getElementById('instagram');

const fullNameError = document.getElementById('fullNameError');
const phoneError = document.getElementById('phoneError');
const emailError = document.getElementById('emailError');

// Функції валідації окремо (повертають текст помилки або пусто)
function validateFullName(value) {
    if (!value) return "Введіть ім'я";
    if (!nameRegex.test(value)) return "Ім'я має містити лише літери, пробіли, дефіси або апострофи";
    return "";
}
function validatePhone(value) {
    if (!value) return "Введіть номер телефону";
    if (!phoneRegex.test(value)) return "Номер телефону має містити лише цифри";
    if (value.length < 8 || value.length > 15) return "Номер телефону має містити від 8 до 15 цифр";
    return "";
}
function validateEmail(value) {
    if (value && !emailStrictRegex.test(value)) return "Gmail повинен бути у форматі example@gmail.com";
    return "";
}

// Заповнення полів при завантаженні
if (!contactId) {
    fullNameError.textContent = "Не передано id контакту";
} else {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts.find(c => c.id === contactId);

    if (!contact) {
        fullNameError.textContent = "Контакт не знайдено";
    } else {
        fullNameInput.value = contact.fullName || '';
        phoneInput.value = contact.phone || '';
        emailInput.value = contact.email || '';
        instagramInput.value = contact.instagram || '';
        descriptionInput.value = contact.description || '';

        document.querySelector('input[placeholder="Посилання на Telegram"]').value = contact.telegram || '';
        document.querySelector('input[placeholder="Посилання на GitHub"]').value = contact.github || '';
        document.querySelector('input[placeholder="Посилання на Discord"]').value = contact.discord || '';
        document.querySelector('input[placeholder="Посилання на Instagram"]').value = contact.instagram || '';
        if (img && contact.photo) img.src = contact.photo;
        if (photoInput) photoInput.value = contact.photo || '';
    }
}

fullNameInput.addEventListener('input', () => {
    fullNameError.textContent = validateFullName(fullNameInput.value.trim());
});

phoneInput.addEventListener('input', () => {
    phoneError.textContent = validatePhone(phoneInput.value.trim());
});

emailInput.addEventListener('input', () => {
    emailError.textContent = validateEmail(emailInput.value.trim());
});


// Зміна фото в реальному часі
photoInput?.addEventListener('input', () => {
    const url = photoInput.value.trim();
    if (url.match(/\.(jpeg|jpg|png|webp|gif)$/i)) {
        img.src = url;
        img.classList.remove('hidden');
    } else {
        img.classList.add('hidden');
    }
});

// Зберегти зміни з перевіркою
document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();

    const fullNameVal = fullNameInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const emailVal = emailInput.value.trim();
    const telegramVal = document.querySelector('input[placeholder="Посилання на Telegram"]').value.trim();
    const githubVal = document.querySelector('input[placeholder="Посилання на GitHub"]').value.trim();
    const discordVal = document.querySelector('input[placeholder="Посилання на Discord"]').value.trim();
    const photoVal = photoInput.value.trim();
    const instagramVal = instagramInput.value.trim();
    const descriptionVal = descriptionInput.value.trim();


    // Перевірки і вивід помилок
    const fullNameErr = validateFullName(fullNameVal);
    const phoneErr = validatePhone(phoneVal);
    const emailErr = validateEmail(emailVal);

    fullNameError.textContent = fullNameErr;
    phoneError.textContent = phoneErr;
    emailError.textContent = emailErr;

    if (fullNameErr || phoneErr || emailErr) return;

    const updatedContact = {
        id: contactId,
        fullName: fullNameVal,
        phone: phoneVal,
        email: emailVal,
        telegram: telegramVal,
        github: githubVal,
        discord: discordVal,
        photo: photoVal,
        instagram: instagramVal,
        description: descriptionVal
    };

    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const index = contacts.findIndex(c => c.id === contactId);

    if (index !== -1) {
        contacts[index] = updatedContact;
        localStorage.setItem('contacts', JSON.stringify(contacts));
        // Можна показати повідомлення успіху (зелений текст)
        window.location.href = 'contactInfo.html?id=' + contactId;
    } else {
        fullNameError.textContent = "Контакт не знайдено для оновлення";
    }
});
const backLink = document.getElementById('backLink');
if (backLink && contactId) {
    backLink.href = `contactInfo.html?id=${contactId}`;
}
