class DraftManager {
    constructor(inputs) {
        this.inputs = inputs;
    }

    restoreDrafts() {
        this.inputs.forEach(({ input, key }) => {
            const saved = localStorage.getItem(key);
            if (saved !== null) input.value = saved;
        });
    }

    attachSaveListeners() {
        this.inputs.forEach(({ input, key }) => {
            input.addEventListener('input', () => {
                localStorage.setItem(key, input.value);
            });
        });
    }

    clearDrafts() {
        this.inputs.forEach(({ key }) => localStorage.removeItem(key));
    }
}

class PhotoPreviewer {
    constructor(photoUrlInput, previewImage) {
        this.photoUrlInput = photoUrlInput;
        this.previewImage = previewImage;
        this.attachListener();
    }

    attachListener() {
        this.photoUrlInput.addEventListener('input', () => this.updatePreview());
    }

    updatePreview() {
        const url = this.photoUrlInput.value.trim();
        if (url.match(/\.(jpeg|jpg|png|webp|gif)$/i)) {
            this.previewImage.src = url;
            this.previewImage.classList.remove('hidden');
        } else {
            this.previewImage.classList.add('hidden');
        }
    }
}

class Validator {
    constructor(fullNameInput, phoneInput, emailInput, fullNameError, phoneError, emailError) {
        this.fullNameInput = fullNameInput;
        this.phoneInput = phoneInput;
        this.emailInput = emailInput;

        this.fullNameError = fullNameError;
        this.phoneError = phoneError;
        this.emailError = emailError;

        this.nameRegex = /^[А-Яа-яЇїІіЄєҐґA-Za-z\s'-]*$/;
        this.phoneRegex = /^\d*$/;

        this.attachListeners();
    }

    attachListeners() {
        this.fullNameInput.addEventListener('input', () => this.validateFullName());
        this.phoneInput.addEventListener('input', () => this.validatePhone());
        this.emailInput.addEventListener('input', () => this.validateEmail());
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
        if (value && ! /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
            this.emailError.textContent = "Недопустимі символи у Gmail";
            return false;
        } else {
            this.emailError.textContent = "";
            return true;
        }
    }

    clearErrors() {
        this.fullNameError.textContent = '';
        this.phoneError.textContent = '';
        this.emailError.textContent = '';
    }
}

class ContactForm {
    constructor() {
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

        this.draftManager = new DraftManager(this.inputs);
        this.photoPreviewer = new PhotoPreviewer(this.photoUrlInput, this.previewImage);
        this.validator = new Validator(this.fullNameInput, this.phoneInput, this.emailInput,
            this.fullNameError, this.phoneError, this.emailError);

        this.init();
    }

    init() {
        this.draftManager.restoreDrafts();
        this.photoPreviewer.updatePreview();
        this.draftManager.attachSaveListeners();
        this.attachSubmitListener();
    }

    attachSubmitListener() {
        this.saveBtn.addEventListener('click', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.validator.clearErrors();

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
        } else if (!this.validator.validateFullName()) {
            hasError = true;
        }

        if (!phone) {
            this.phoneError.textContent = "Введіть номер телефону";
            hasError = true;
        } else if (!this.validator.validatePhone()) {
            hasError = true;
        }

        if (email && !this.validator.validateEmail()) {
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

        this.draftManager.clearDrafts();

        try {
            addContact(contact);
            localStorage.setItem("toastMessage", "✅ Контакт успішно додано!");
            window.location.href = "index.html";
        } catch (error) {
            localStorage.setItem("toastMessage", "❌ Не вдалося додати контакт!");
            window.location.href = "index.html";
        }

    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
