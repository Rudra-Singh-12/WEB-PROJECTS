// DOM Elements - all the elements we need from HTML
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLableBox = document.getElementById("strength-label")

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input", () => {
    lengthDisplay.textContent = lengthSlider.value
})

generateButton.addEventListener('click', makePassword)

function makePassword() {
    const length = Number(lengthSlider.value)
    const includeUppercase = uppercaseCheckbox.checked
    const includeLowercase = lowercaseCheckbox.checked
    const includeNumber = numbersCheckbox.checked
    const includeSymbols = symbolsCheckbox.checked

    if (!includeUppercase && !includeLowercase && !includeNumber && !includeSymbols) {
        alert("Please select at least one char type.")
        return
    }

    const newPassword = createRandomPassword(
        length,
        includeLowercase,
        includeUppercase,
        includeNumber,
        includeSymbols)

    passwordInput.value = newPassword
    updateStrengthMeter(newPassword)
}

function createRandomPassword(
    length,
    includeLowercase,
    includeUppercase,
    includeNumber,
    includeSymbols) {
    let allCharacters = ""

    if (includeUppercase) allCharacters += uppercaseLetters
    if (includeLowercase) allCharacters += lowercaseLetters
    if (includeNumber) allCharacters += numberCharacters
    if (includeSymbols) allCharacters += symbolCharacters

    let password = ""

    for (let i = 0; i < length; i++) {
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)]
    }

    return password
}

function updateStrengthMeter(password) {
    const passwordLength = password.length
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password)

    let score = 0

    score += Math.min(passwordLength * 2, 40)

    if (hasUppercase) score += 15
    if (hasLowercase) score += 15
    if (hasNumber) score += 15
    if (hasSymbols) score += 15

    if (passwordLength < 8) {
        score = Math.min(score, 40)
    }

    const safescore = Math.max(5, Math.min(100, score))

    strengthBar.style.width = safescore + "%"

    let strengthLabel = ""
    let barColor = ""

    if (score < 40) {
        barColor = "#fc8181"
        strengthLabel = "Weak"
    } else if (score < 70) {
        barColor = "#fbd38d"
        strengthLabel = "Medium"
    } else {
        barColor = "#68d391"
        strengthLabel = "Strong"
    }
    strengthBar.style.backgroundColor = barColor
    strengthLableBox.textContent = strengthLabel
}


window.addEventListener("DOMContentLoaded", makePassword)

copyButton.addEventListener('click', () => {
    if (!passwordInput.value) return

    navigator.clipboard.writeText(passwordInput.value)
        .then(() => showCopySuccess())
        .catch((err) => console.log("Could not copy " + err))
})

function showCopySuccess() {
    copyButton.classList.remove("far", "fa-copy")
    copyButton.classList.add("fas", "fa-check")
    copyButton.style.color = "#48bb78"

    setTimeout(() => {
        copyButton.classList.remove("fas", "fa-check")
        copyButton.classList.add("far", "fa-copy")
        copyButton.style.color = ""
    }, 1500)
}