/**
 * @type {HTMLFormElement}
 */
const form = document.querySelector("form");

/**
 * @type {HTMLInputElement}
 */
const photo_display = document.getElementById("photo_display");

/**
 * @type {HTMLInputElement}
 */
const photo = document.getElementById("photo");

/**
 * @type {HTMLInputElement}
 */
const email = document.getElementById("email");

/**
 * @type {HTMLInputElement}
 */
const phone = document.getElementById("phone");

/**
 * @type {HTMLInputElement}
 */
const password = document.getElementById("password");

/**
 * @type {HTMLInputElement}
 */
const password_confirm = document.getElementById("password_confirm");

/**
 * @type {HTMLInputElement}
 */
const gender = document.getElementById("gender");

/**
 * @type {HTMLDivElement}
 */
const custom_gender_options = document.getElementById("custom_gender_options");

/**
 * @type {HTMLButtonElement}
 */
const submit_button = document.querySelector("form button[type='submit']");


const PHONE_REGEX = /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4,6}$/im;

class Utils {
    /**
     * @param {HTMLElement} element 
     * @param {String} class_name 
     * @param {Boolean} state
     */
    static setClass(element, class_name, state) {
        if (state) {
            element.classList.add(class_name);
        } else {
            element.classList.remove(class_name);
        }
    }

    /**
     * @param {HTMLElement} element 
     */
    static setValid(element) {
        this.setClass(element, "invalid", false);
    }

    /**
     * @param {HTMLElement} element 
     */
    static setInvalid(element) {
        this.setClass(element, "invalid", true);
    }

    /**
     * @param {HTMLElement} element 
     * @param {String} message
     */
    static setStatus(element, message) {
        let status = element.parentElement.querySelector("div.status");
        if (status == null) {
            status = document.createElement("div");
            status.classList.add("status");
            element.parentElement.append(status);
        }
        status.innerHTML = message;
    }

    /**
     * @param {HTMLElement} element 
     */
    static clearStatus(element) {
        let status = element.parentElement.querySelector("div.status");
        if (status != null) { status.remove(); }
    }
}

class Validators {
    /**
     * @param {HTMLInputElement} element
     * @returns {Boolean}
     */
    static phone(element) {
        return PHONE_REGEX.test(element.value);
    }


    /**
     * @param {HTMLInputElement} element
     * @returns {Boolean}
     */
    static password(element) {
        return element.value.length >= 15;
    }

    /**
     * @param {HTMLInputElement} element
     * @returns {Boolean}
     */
    static email(element) {
        return element.type == "email" && element.checkValidity();
    }
}



photo.addEventListener("input", (event) => {
    let f = new FileReader();
    f.addEventListener("load", (event) => {
        photo_display.src = event.target.result;
    });
    f.readAsDataURL(event.target.files[0]);
});

email.addEventListener("input", () => {
    if (Validators.email(email)) {
        Utils.clearStatus(email);
    } else {
        Utils.setStatus(email, "Email address not recognized.");
    }
});

phone.addEventListener("input", () => {
    if (Validators.phone(phone)) {
        Utils.setValid(phone);
        Utils.clearStatus(phone);
    } else {
        Utils.setInvalid(phone);
        Utils.setStatus(phone, "Phone number not recognized.");
    }
});

password.addEventListener("input", () => {
    if (Validators.password(password)) {
        Utils.clearStatus(password);
    } else {
        Utils.setStatus(password, "Password must be at least 15 characters.");
    }
    if (password.value == password_confirm.value) {
        Utils.setValid(password_confirm);
        Utils.clearStatus(password_confirm);
    } else {
        Utils.setInvalid(password_confirm);
        Utils.setStatus(password_confirm, "Passwords do not match.");
    }
});

password_confirm.addEventListener("input", () => {
    if (password.value == password_confirm.value) {
        Utils.setValid(password_confirm);
        Utils.clearStatus(password_confirm);
    } else {
        Utils.setInvalid(password_confirm);
        Utils.setStatus(password_confirm, "Passwords do not match.");
    }
});

gender.addEventListener("input", () => {
    if (gender.value == "custom") {
        Utils.setClass(custom_gender_options, "hidden", false);
    } else {
        Utils.setClass(custom_gender_options, "hidden", true);
    }
});

form.addEventListener("submit", (event) => {
    let valid = true;
    form.querySelectorAll("input").forEach((element) => {
        if (!element.checkValidity() || element.classList.contains("invalid")) {
            Utils.setStatus(element, "Please fix this field before submitting.")
            valid = false;
        }
    });
    if (!valid) {
        event.preventDefault();
        
    }
});
