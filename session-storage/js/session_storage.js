/**
 * @type {HTMLInputElement}
 */
const first_name = document.getElementById("first_name");

/**
 * @type {HTMLInputElement}
 */
const last_name = document.getElementById("last_name");

/**
 * @type {HTMLInputElement}
 */
const email = document.getElementById("email");

/**
 * @type {HTMLInputElement}
 */
const city = document.getElementById("city");

/**
 * @type {HTMLInputElement}
 */
const state = document.getElementById("state");

/**
 * @type {HTMLInputElement}
 */
const zip_code = document.getElementById("zip_code");

/**
 * @type {HTMLParagraphElement}
 */
const status_display = document.getElementById("status");

const inputs = [first_name, last_name, email, city, state, zip_code];

function save() {
    for (i in inputs) {
        sessionStorage.setItem(
            inputs[i].id,
            inputs[i].value
        );
    }
    status_display.innerHTML = "Saved to session storage.";
}

function restore() {

    for (i in inputs) {
        let value = sessionStorage.getItem(inputs[i].id);
        if (value == null) {
            inputs[i].value = "";
        } else {
            inputs[i].value = value;
        }
    }
    status_display.innerHTML = "Restored from session storage.";
}

function clear_saved() {
    for (i in inputs) {
        sessionStorage.removeItem(inputs[i].id)
    }
    status_display.innerHTML = "Cleared saved values in session storage.";
}
