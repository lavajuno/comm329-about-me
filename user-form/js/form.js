/**
 * @type {HTMLInputElement}
 */
const pfp = document.getElementById("pfp");

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
const first_name = document.getElementById("first_name");

/**
 * @type {HTMLInputElement}
 */
const last_name = document.getElementById("last_name");

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

/**
 * @param {HTMLInputElement} element
 * @returns {Boolean}
 */
function validateDate(element) {
    return element.type == "date" && element.checkValidity();
}


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

date.addEventListener("input", () => {
    if (validateEmail(email)) {
        clearStatus(email);
    } else {
        setStatus(email, "Date not recognized.");
    }
});