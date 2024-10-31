/**
 * @type {HTMLFormElement}
 */
const form = document.querySelector("form");

/**
 * @type {HTMLInputElement}
 */
const name_input = document.getElementById("name");

/**
 * @type {HTMLInputElement}
 */
const email_input = document.getElementById("email");

/**
 * @type {HTMLInputElement}
 */
const message_input = document.getElementById("message");

/**
 * @type {HTMLButtonElement}
 */
const submit_button = document.querySelector("form button[type='submit']");

/**
 * @type {RegExp}
 */
const BAD_CHARS_REGEX = /[<>"]/i;


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

    /**
     * @param {HTMLInputElement} text_input 
     * @param {HTMLInputElement} hash_input 
     */
    static async setHash(text_input, hash_input) {
        let hash = await Crypto.hash(text_input.value);
        hash_input.value = hash;
    }
}

class Validators {
    /**
     * @param {HTMLInputElement} element
     * @returns {Boolean}
     */
    static email(element) {
        return element.type == "email" && element.checkValidity();
    }

    /**
     * @param {HTMLInputElement} element
     * @returns {Boolean}
     */
    static name(element) {
        return !BAD_CHARS_REGEX.test(element.value);
    }
}

name_input.addEventListener("input", () => {
    if (Validators.name(name_input)) {
        Utils.setValid(name_input);
        Utils.clearStatus(name_input);
    } else {
        Utils.setInvalid(name_input);
        Utils.setStatus(name_input, "Name contains invalid characters.");
    }
});

email_input.addEventListener("input", () => {
    if (Validators.email(email_input)) {
        Utils.clearStatus(email_input);
    } else {
        Utils.setStatus(email_input, "Email address not recognized.");
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
