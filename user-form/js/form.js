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

const PHONE_REGEX = /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4,6}$/im;


/**
 * @param {HTMLElement} element 
 * @param {String} class_name 
 * @param {Boolean} state
 */
function setClass(element, class_name, state) {
    if (state) {
        element.classList.add(class_name);
    } else {
        element.classList.remove(class_name);
    }
}

/**
 * @param {HTMLElement} element 
 * @param {String} message
 */
function setStatus(element, message) {
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
function clearStatus(element) {
    let status = element.parentElement.querySelector("div.status");
    if (status != null) { status.remove(); }
}

/**
 * @param {HTMLInputElement} element
 * @returns {Boolean}
 */
function validatePhone(element) {
    return PHONE_REGEX.test(element.value);
}


/**
 * @param {HTMLInputElement} element
 * @returns {Boolean}
 */
function validatePassword(element) {
    return element.value.length >= 15;
}

/**
 * @param {HTMLInputElement} element
 * @returns {Boolean}
 */
function validateEmail(element) {
    return element.type == "email" && element.checkValidity();
}

photo.addEventListener("input", (event) => {
    let f = new FileReader();
    f.addEventListener("load", (event) => {
        photo_display.src = event.target.result;
    });
    f.readAsDataURL(event.target.files[0]);
});

email.addEventListener("input", () => {
    if (validateEmail(email)) {
        clearStatus(email);
    } else {
        setStatus(email, "Email address not recognized.");
    }
});

phone.addEventListener("input", () => {
    if (validatePhone(phone)) {
        setClass(phone, "invalid", false);
        clearStatus(phone);
    } else {
        setClass(phone, "invalid", true);
        setStatus(phone, "Phone number not recognized.");
    }
});

password.addEventListener("input", () => {
    if (validatePassword(password)) {
        clearStatus(password);
    } else {
        setStatus(password, "Password must be at least 15 characters.");
    }
    if (password.value == password_confirm.value) {
        clearStatus(password_confirm);
    } else {
        setStatus(password_confirm, "Passwords do not match.");
    }
});

password_confirm.addEventListener("input", () => {
    if (password.value == password_confirm.value) {
        clearStatus(password_confirm);
    } else {
        setStatus(password_confirm, "Passwords do not match.");
    }
});

gender.addEventListener("input", () => {
    if (gender.value == "custom") {
        setClass(custom_gender_options, "hidden", false);
    } else {
        setClass(custom_gender_options, "hidden", true);
    }
});
