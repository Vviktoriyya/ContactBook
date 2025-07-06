// Регулярки для перевірки
const nameRegex = /^[А-Яа-яЁёЇїІіЄєҐґA-Za-z\s'-]*$/;
const phoneRegex = /^\d*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]*@?gmail?\.?com?$/;

// Елементи форми та помилок
const fullNameInput = document.getElementById('fullName');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const telegramInput = document.getElementById('telegram');
const githubInput = document.getElementById('github');
const discordInput = document.getElementById('discord');
const photoUrlInput = document.getElementById('photoUrl');
const previewImage = document.getElementById('previewImage');
const saveBtn = document.getElementById('saveContactBtn');

const fullNameError = document.getElementById('fullNameError');
const phoneError = document.getElementById('phoneError');
const emailError = document.getElementById('emailError');

const instagramInput = document.getElementById('instagram');
const descriptionInput = document.getElementById('description');


// Масив усіх input-полів для збереження/відновлення
const inputs = [
    { input: fullNameInput, key: 'draft_fullName' },
    { input: phoneInput, key: 'draft_phone' },
    { input: emailInput, key: 'draft_email' },
    { input: telegramInput, key: 'draft_telegram' },
    { input: githubInput, key: 'draft_github' },
    { input: discordInput, key: 'draft_discord' },
    { input: photoUrlInput, key: 'draft_photoUrl' },
    { input: instagramInput, key: 'draft_instagram' },
    { input: descriptionInput, key: 'draft_description' }
];

// Відновлення чернеток з localStorage
inputs.forEach(({ input, key }) => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
        input.value = saved;
    }
});

// Зберігати значення в localStorage при вводі
inputs.forEach(({ input, key }) => {
    input.addEventListener('input', () => {
        localStorage.setItem(key, input.value);
    });
});

// Показ зображення з посилання
photoUrlInput.addEventListener('input', () => {
    const url = photoUrlInput.value.trim();
    if (url.match(/\.(jpeg|jpg|png|webp|gif)$/i)) {
        previewImage.src = url;
        previewImage.classList.remove('hidden');
    } else {
        previewImage.classList.add('hidden');
    }
});

// Валідація в реальному часі для fullName
fullNameInput.addEventListener('input', () => {
    const value = fullNameInput.value;
    if (!nameRegex.test(value)) {
        fullNameError.textContent = "Ім'я має містити лише літери, пробіли, дефіси або апострофи";
    } else {
        fullNameError.textContent = "";
    }
});

// Валідація в реальному часі для phone
phoneInput.addEventListener('input', () => {
    const value = phoneInput.value;

    if (!phoneRegex.test(value)) {
        phoneError.textContent = "Номер телефону має містити лише цифри";
    } else if (value.length > 0 && (value.length < 8 || value.length > 15)) {
        phoneError.textContent = "Номер телефону має містити від 8 до 15 цифр";
    } else {
        phoneError.textContent = "";
    }
});


// Валідація в реальному часі для email
emailInput.addEventListener('input', () => {
    const value = emailInput.value;
    if (value && !/^[a-zA-Z0-9._%+-@]*$/.test(value)) {
        emailError.textContent = "Недопустимі символи у Gmail";
    } else {
        emailError.textContent = "";
    }
});

// Кнопка Зберегти контакт
saveBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // Очищення помилок
    fullNameError.textContent = '';
    phoneError.textContent = '';
    emailError.textContent = '';

    const fullName = fullNameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const telegram = telegramInput.value.trim();
    const github = githubInput.value.trim();
    const discord = discordInput.value.trim();
    const photoUrl = photoUrlInput.value.trim();
    const instagram = instagramInput.value.trim();
    const description = descriptionInput.value.trim();


    let hasError = false;

    if (!fullName) {
        fullNameError.textContent = "Введіть ім'я";
        hasError = true;
    } else if (!nameRegex.test(fullName)) {
        fullNameError.textContent = "Ім'я має містити лише літери, пробіли, дефіси або апострофи";
        hasError = true;
    }

    if (!phone) {
        phoneError.textContent = "Введіть номер телефону";
        hasError = true;
    } else if (!phoneRegex.test(phone)) {
        phoneError.textContent = "Номер телефону має містити лише цифри";
        hasError = true;
    } else if (phone.length < 8 || phone.length > 15) {
        phoneError.textContent = "Номер телефону має містити від 8 до 15 цифр";
        hasError = true;
    }


    // Gmail необов’язковий
    if (email && !emailRegex.test(email)) {
        emailError.textContent = "Введіть правильний Gmail (наприклад: example@gmail.com)";
        hasError = true;
    }


    if (hasError) return;

    const contact = {
        id: Date.now().toString(),
        fullName,
        phone,
        email,
        telegram,
        github,
        discord,
        photo: photoUrl,
        instagram,
        description
    };

    // Очистити чернетки після успішного збереження
    inputs.forEach(({ key }) => localStorage.removeItem(key));

    addContact(contact);
    window.location.href = "index.html";
});
