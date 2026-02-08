// DOM ELEMENTS
const generateBtn = document.getElementById("generate-btn")
const paletteContainer = document.querySelector(".palette-container")

generateBtn.addEventListener("click", generatePalette)

paletteContainer.addEventListener("click", (e) => {
    // Click on copy button
    if (e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent

        navigator.clipboard.writeText(hexValue)
            .then(() => showCopySuccess(e.target))
            .catch(err => alert(err))
    }

    // Click on color box
    else if (e.target.classList.contains("color")) {
        const hexValue = e.target.nextElementSibling
            .querySelector(".hex-value").textContent

        const btn = e.target.nextElementSibling
            .querySelector(".copy-btn")

        navigator.clipboard.writeText(hexValue)
            .then(() => showCopySuccess(btn))
            .catch(err => alert(err))
    }
})

function generatePalette() {
    const colors = []

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandom())
    }

    updatePaletteDisplay(colors)
}

function generateRandom() {
    const letters = "0123456789ABCDEF"
    let color = "#"

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }

    return color
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box")

    colorBoxes.forEach((box, index) => {
        const color = colors[index]
        const colorDiv = box.querySelector(".color")
        const hexValue = box.querySelector(".hex-value")

        colorDiv.style.backgroundColor = color
        hexValue.textContent = color
    })
}

function showCopySuccess(button) {
    button.classList.remove("far", "fa-copy")
    button.classList.add("fas", "fa-check")
    button.style.color = "#48bb78"

    setTimeout(() => {
        button.classList.remove("fas", "fa-check")
        button.classList.add("far", "fa-copy")
        button.style.color = ""
    }, 1500)
}

// Initial palette
generatePalette()
