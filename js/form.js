// Booking form validation (contact.html)

// Simple email check: something@something.something
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_NAME_LENGTH = 3;
const MIN_MESSAGE_LENGTH = 10;
const MIN_PEOPLE = 1;
const MAX_PEOPLE = 10;

// Every function below checks one field.
// It returns an error text, or an empty string "" if the value is correct.
function checkName(value) {
    if (value.trim() === "") return "Please enter your name.";
    if (value.trim().length < MIN_NAME_LENGTH) return "Name must be at least " + MIN_NAME_LENGTH + " characters.";
    if (/\d/.test(value)) return "Name cannot contain numbers.";
    return "";
}

function checkEmail(value) {
    if (value.trim() === "") return "Please enter your email.";
    if (!EMAIL_PATTERN.test(value.trim())) return "Email format is wrong. Example: name@example.com";
    return "";
}

function checkTour(value) {
    if (value === "") return "Please choose a tour package.";
    return "";
}

function checkPeople(value) {
    if (value === "") return "Enter number of travelers.";
    const number = Number(value);
    if (!Number.isInteger(number) || number < MIN_PEOPLE || number > MAX_PEOPLE) {
        return "Travelers must be from " + MIN_PEOPLE + " to " + MAX_PEOPLE + ".";
    }
    return "";
}

function checkMessage(value) {
    if (value.trim().length < MIN_MESSAGE_LENGTH) return "Message must be at least " + MIN_MESSAGE_LENGTH + " characters.";
    return "";
}

// Which check function is used for which field (field id -> function)
const formRules = [
    { id: "user-name", check: checkName },
    { id: "user-email", check: checkEmail },
    { id: "tourSelect", check: checkTour },
    { id: "people", check: checkPeople },
    { id: "messageInput", check: checkMessage }
];

// Shows or hides the error message under one field.
// Returns true if the field is valid.
function showFieldResult(input, errorText) {
    const errorBox = document.getElementById(input.id + "-error");
    errorBox.textContent = errorText;

    if (errorText === "") {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return true;
    }
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
}

function validateField(rule) {
    const input = document.getElementById(rule.id);
    return showFieldResult(input, rule.check(input.value));
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    if (!form) return; // this code is only for contact.html

    const successBox = document.getElementById("success-box");
    const message = document.getElementById("messageInput");
    const charCount = document.getElementById("char-count");

    // Check a field again while the user is fixing it
    formRules.forEach(function (rule) {
        const input = document.getElementById(rule.id);
        const eventName = input.tagName === "SELECT" ? "change" : "input";

        input.addEventListener(eventName, function () {
            successBox.style.display = "none";
            // Only re-check after the field was marked (so we don't show errors too early)
            if (input.classList.contains("is-invalid") || input.classList.contains("is-valid")) {
                validateField(rule);
            }
        });
    });

    // Live character counter for the message
    message.addEventListener("input", function () {
        charCount.textContent = message.value.length;
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // stop the page from reloading
        successBox.style.display = "none";

        let allValid = true;
        for (const rule of formRules) {
            if (!validateField(rule)) {
                allValid = false;
            }
        }

        if (!allValid) {
            // Move the cursor to the first wrong field
            form.querySelector(".is-invalid").focus();
            return;
        }

        const name = document.getElementById("user-name").value.trim();
        const tour = document.getElementById("tourSelect").value;
        successBox.textContent = "Thank you, " + name + "! Your request for \"" + tour + "\" was sent. We will contact you soon.";
        successBox.style.display = "block";

        form.reset();
        charCount.textContent = "0";
        formRules.forEach(function (rule) {
            document.getElementById(rule.id).classList.remove("is-valid", "is-invalid");
        });
    });
});
