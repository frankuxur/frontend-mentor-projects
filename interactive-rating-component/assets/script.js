const buttons = document.querySelectorAll('.rate__btn')
const submit = document.querySelector('.rate__submit')

let rating
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('select')
        rating = +btn.querySelector('button').name

        Array.from(buttons).map(x => {
            if (x !== btn) {
                x.classList.remove('select')
            }
        })
    })
})

submit.addEventListener('click', () => {
    if (rating) {
        document.querySelector('.rate').style.display = 'none'
        document.querySelector('.thank-you').style.display = 'flex'
        document.querySelector('.result').innerText = rating
    } 
})

// frankuxur

