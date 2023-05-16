const toggle = document.querySelector('.toggle')
const priceSections = document.querySelectorAll('.price-section')

toggle.addEventListener('click', () => {
    priceSections.forEach(priceSection => {
        priceSection.classList.toggle('active')
        toggle.classList.toggle('active')
    })
})