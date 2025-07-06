class ContactForm {
    constructor() {
        // Регулярки
        this.nameRegex = /^[А-Яа-яЁёЇїІіЄєҐґA-Za-z\s'-]*$/;
        this.phoneRegex = /^\d*$/;
        this.emailRegex = /^[a-zA-Z0-9._%+-]*@?gmail?\.?com?$/;

        // DOM-елементи
        this.fullNameInput = document.getElementById('fullName');
        this.phoneInput = document.getElementById('phone');
        this.emailInput = document.getElementById('email');
        this.telegramInput = document.getElementById('telegram');
        this.githubInput = document.getElementById('github');
        this.discordInput = document.getElementById('discord');
        this.photoUrlInput = document.getElementById('photoUrl');
        this.previewImage = document.getElementById('previewImage');
        this.saveBtn = document.getElementById('saveContactBtn');
        this.instagramInput = document.getElementById('instagram');
        this.descriptionInput = document.getElementById('description');

        this.fullNameError = document.getElementById('fullNameError');
        this.phoneError = document.getElementById('phoneError');
        this.emailError = document.getElementById('emailError');

        this.inputs = [
            { input: this.fullNameInput, key: 'draft_fullName' },
            { input: this.phoneInput, key: 'draft_phone' },
            { input: this.emailInput, key: 'draft_email' },
            { input: this.telegramInput, key: 'draft_telegram' },
            { input: this.githubInput, key: 'draft_github' },
            { input: this.discordInput, key: 'draft_discord' },
            { input: this.photoUrlInput, key: 'draft_photoUrl' },
            { input: this.instagramInput, key: 'draft_instagram' },
            { input: this.descriptionInput, key: 'draft_description' }
        ];

        this.init();
    }

    init() {
        this.restoreDrafts();
        this.attachEventListeners();
    }

    restoreDrafts() {
        this.inputs.forEach(({ input, key }) => {
            const saved = localStorage.getItem(key);
            if (saved !== null) input.value = saved;
        });
    }

    attachEventListeners() {
        this.inputs.forEach(({ input, key }) => {
            input.addEventListener('input', () => {
                localStorage.setItem(key, input.value);
            });
        });

        this.photoUrlInput.addEventListener('input', () => this.updatePhotoPreview());

        this.fullNameInput.addEventListener('input', () => this.validateFullName());
        this.phoneInput.addEventListener('input', () => this.validatePhone());
        this.emailInput.addEventListener('input', () => this.validateEmail());

        this.saveBtn.addEventListener('click', (e) => this.handleSubmit(e));
    }

    updatePhotoPreview() {
        const url = this.photoUrlInput.value.trim();
        if (url.match(/\.(jpeg|jpg|png|webp|gif)$/i)) {
            this.previewImage.src = url;
            this.previewImage.classList.remove('hidden');
        } else {
            this.previewImage.classList.add('hidden');
        }
    }

    validateFullName() {
        const value = this.fullNameInput.value;
        if (!this.nameRegex.test(value)) {
            this.fullNameError.textContent = "Ім'я має містити лише літери, пробіли, дефіси або апострофи";
            return false;
        } else {
            this.fullNameError.textContent = "";
            return true;
        }
    }

    validatePhone() {
        const value = this.phoneInput.value;
        if (!this.phoneRegex.test(value)) {
            this.phoneError.textContent = "Номер телефону має містити лише цифри";
            return false;
        } else if (value.length > 0 && (value.length < 8 || value.length > 15)) {
            this.phoneError.textContent = "Номер телефону має містити від 8 до 15 цифр";
            return false;
        } else {
            this.phoneError.textContent = "";
            return true;
        }
    }

    validateEmail() {
        const value = this.emailInput.value;
        if (value && !/^[a-zA-Z0-9._%+-@]*$/.test(value)) {
            this.emailError.textContent = "Недопустимі символи у Gmail";
            return false;
        } else {
            this.emailError.textContent = "";
            return true;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // Очищаємо помилки
        this.fullNameError.textContent = '';
        this.phoneError.textContent = '';
        this.emailError.textContent = '';

        const fullName = this.fullNameInput.value.trim();
        const phone = this.phoneInput.value.trim();
        const email = this.emailInput.value.trim();
        const telegram = this.telegramInput.value.trim();
        const github = this.githubInput.value.trim();
        const discord = this.discordInput.value.trim();
        const photoUrl = this.photoUrlInput.value.trim();
        const instagram = this.instagramInput.value.trim();
        const description = this.descriptionInput.value.trim();

        let hasError = false;

        if (!fullName) {
            this.fullNameError.textContent = "Введіть ім'я";
            hasError = true;
        } else if (!this.nameRegex.test(fullName)) {
            this.fullNameError.textContent = "Ім'я має містити лише літери, пробіли, дефіси або апострофи";
            hasError = true;
        }

        if (!phone) {
            this.phoneError.textContent = "Введіть номер телефону";
            hasError = true;
        } else if (!this.phoneRegex.test(phone)) {
            this.phoneError.textContent = "Номер телефону має містити лише цифри";
            hasError = true;
        } else if (phone.length < 8 || phone.length > 15) {
            this.phoneError.textContent = "Номер телефону має містити від 8 до 15 цифр";
            hasError = true;
        }

        if (email && !this.emailRegex.test(email)) {
            this.emailError.textContent = "Введіть правильний Gmail (наприклад: example@gmail.com)";
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

        // Очистити чернетки
        this.inputs.forEach(({ key }) => localStorage.removeItem(key));

        addContact(contact);
        window.location.href = "index.html";
    }
}

// Ініціалізація форми після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
