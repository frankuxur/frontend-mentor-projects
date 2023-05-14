const cardTags = document.querySelectorAll('.card p')

const cardInfo = {
    name: cardTags[1],
    number: cardTags[0],
    exp: cardTags[2],
    cvc: cardTags[3]
}

// form 
const form = document.querySelector('.form')
const complete = document.querySelector('.complete')
const submit = document.querySelector('.submit')
const formData = document.querySelectorAll('.form__field input')
const errorTags = document.querySelectorAll('.error')

window.onload = () => {
    errorTags.forEach(err => {
        err.style.opacity = "0"
    })
}


// for card number
let foo = []
let newFoo = []

// for card month
let month_year = ['00', '/', '00']

// for card cvc
let cvc = ''

formData.forEach(data => {

    // update card name 
    if (data.id === 'name') {
        data.addEventListener('input', (e) => {
            cardInfo.name.innerText = e.target.value
        })
    }


    // type and update card no.
    if (data.id === 'number') {
        
        data.addEventListener('input', (e) => {
            foo = (e.target.value).split('')
            
            data.value = foo.join('')
    
            if (foo[3] && foo[4] !== ' ') foo.splice(4, 0, ' ')
            if (foo[8] && foo[9] !== ' ') foo.splice(9, 0, ' ')
            if (foo[13] && foo[14] !== ' ') foo.splice(14, 0, ' ')
    
            const newStr = foo.join('')
            cardInfo.number.innerText = newStr
        })
    }


    // update month 
    if (data.id === 'month') {
        data.addEventListener('input', (e) => {
            month_year[0] = e.target.value
            cardInfo.exp.innerText = month_year.join('')
        })
    }

    // update year 
    if (data.id === 'year') {
        data.addEventListener('input', (e) => {
            month_year[2] = e.target.value
            cardInfo.exp.innerText = month_year.join('')
        })
    }

    // update cvc 
    if (data.id === 'cvc') {
        data.addEventListener('input', (e) => {
            cvc = e.target.value
            cardInfo.cvc.innerText = cvc
        })
    }

})


// VALIDATION & submit
let isNameValid = false
let isNumberValid = false
let isMonthValid = false
let isYearrValid = false
let isCvcValid = false
submit.addEventListener('click', (event) => {
    event.preventDefault()

    // check if name is valid
    checkName(cardInfo.name.innerText)

    // check if number is valid
    checkNumber(cardInfo.number.innerText)

    // check if month & year are valid
    checkDate(cardInfo.exp.innerText)

    // check if cvc is valid
    cvcCheck(cvc)

    if (isNameValid && isNumberValid && isMonthValid && isYearrValid && isCvcValid) {
        toggleAppearance(form)
        setTimeout(() => {
            toggleAppearance(complete)
        }, 100);
    } 
})

// reset form
complete.querySelector('button').addEventListener('click', () => {
    toggleAppearance(complete)
        setTimeout(() => {
            toggleAppearance(form)
        }, 100);

    form.reset()

    cardInfo.name.innerText = 'Jane Appleseed'
    cardInfo.number.innerText = '0000 0000 0000 0000'
    cardInfo.exp.innerText = '00/00'
    cardInfo.cvc.innerText = '000'
})


function checkNumber(str) {
    const num = +str.split(' ').join('')

    if (num === 0) {
        isNumberValid = false
        errorTags[1].style.opacity = '1'
        errorTags[1].innerText = `Can't be blank`
        errOutline(errorTags[1])
        return
    }

    if (num.toString().length !== 16 && !isNaN(num)) {
        isNumberValid = false
        errorTags[1].style.opacity = '1'
        errorTags[1].innerText = `Should have 16 digits`
        errOutline(errorTags[1])
        return
    }

    if (isNaN(num)) {
        isNumberValid = false
        errorTags[1].style.opacity = '1'
        errorTags[1].innerText = 'Wrong format, numbers only'
        errOutline(errorTags[1])
    } else {
        isNumberValid = true
        errorTags[1].style.opacity = '0'
        validOutline(errorTags[1])
    }   
}

function checkName(str) {
    if (document.querySelector('#name').value === '' || str.trim().length === 0) {
        isNameValid = false
        errorTags[0].innerText = `Can't be blank`
        errorTags[0].style.opacity = '1'
        errOutline(errorTags[0])
    } else {
        isNameValid = true
        errorTags[0].style.opacity = '0'
        validOutline(errorTags[0])
    }
}

function checkDate(exp) {
    let [month, year] = exp.split('/')

    monthCheck(month)

    yearCheck(year)

}

// month check
function monthCheck(month) {

    if (document.querySelector('#month').value === '' || +month === 0) {
        isMonthValid = false
        errorTags[2].innerText = `Can't be blank`
        errorTags[2].style.opacity = '1'
        errOutline(errorTags[2], 2)
        return
    } 
    
    if (isNaN(+month)) {
        isMonthValid = false
        errorTags[2].style.opacity = '1'
        errorTags[2].innerText = 'Wrong format, numbers only'
        errOutline(errorTags[2], 2)
        return
    } 
    
    if (+month < 0 || +month >12) {
        isMonthValid = false
        errorTags[2].style.opacity = '1'
        errorTags[2].innerText = 'Invalid month'
        errOutline(errorTags[2], 2)
    } else {
        isMonthValid = true
        errorTags[2].style.opacity = '0'
        validOutline(errorTags[2], 2)
    }
}

// year check
function yearCheck(year) {
    
    if (document.querySelector('#year').value === '' || +year === 0) {
        isYearrValid = false
        errorTags[3].innerText = `Can't be blank`
        errorTags[3].style.opacity = '1'
        errOutline(errorTags[3], 3)
        return 
    }
    
    if (isNaN(+year)) {
        isMonthValid = false
        errorTags[3].style.opacity = '1'
        errorTags[3].innerText = 'Wrong format, numbers only'
        errOutline(errorTags[3], 3)
    } else {
        isYearrValid = true
        errorTags[3].style.opacity = '0'
        validOutline(errorTags[3], 3)
    }
}

// cvc check
function cvcCheck(cvc) {
    
    if (document.querySelector('#cvc').value === '' || +year === 0) {
        isCvcValid = false
        errorTags[4].innerText = `Can't be blank`
        errorTags[4].style.opacity = '1'
        errOutline(errorTags[4])
        return 
    }
    
    if (cvc.length !== 3 && !isNaN(+cvc)) {
        isCvcValid = false
        errorTags[4].style.opacity = '1'
        errorTags[4].innerText = 'Should have 3 digits'
        errOutline(errorTags[4])
        return
    }
    
    if (isNaN(+cvc)) {
        isCvcValid = false
        errorTags[4].style.opacity = '1'
        errorTags[4].innerText = 'Wrong format, numbers only'
        errOutline(errorTags[4])
    } else {
        isCvcValid = true
        errorTags[4].style.opacity = '0'
        validOutline(errorTags[4])
    }
}

// toggle appearance
function toggleAppearance (x) {
    if (!x.classList.contains('hidden')) {

        x.classList.add('visuallyhidden');    
        x.addEventListener('transitionend', function(e) {
            x.classList.add('hidden');
        }, {
          capture: false,
          once: true,
          passive: false
        });

        
      } else {
        x.classList.remove('hidden');
        setTimeout(function () {
          x.classList.remove('visuallyhidden');
        }, 20);
      }
    
}


const errColor = 'var(--Red)';
const validColor = 'var(--Dark-grayish-violet)';

function errOutline(tag, index) {

    if (index) {
        formData[index].style.outlineColor = errColor
        formData[index].style.borderColor = errColor
        return
    }

    tag.previousSibling.previousSibling.style.outlineColor = errColor
    tag.previousSibling.previousSibling.style.borderColor = errColor
}

function validOutline(tag, index) {
    if (index) {
        formData[index].style.outlineColor = validColor
        formData[index].style.borderColor = 'var(--Light-grayish-violet)'
        return
    }

    tag.previousSibling.previousSibling.style.outlineColor = validColor
    tag.previousSibling.previousSibling.style.borderColor = 'var(--Light-grayish-violet)'
}

// frankuxur