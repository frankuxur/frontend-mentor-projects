const d = document

const form = d.querySelector('form')
const btn = d.querySelector('.btn')

const data = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
}

btn.addEventListener('click', (e) => {
    e.preventDefault()

    
    const day = d.querySelector('#day')
    const month = d.querySelector('#month')
    const year = d.querySelector('#year')


    checkError(day, month, year)
})

function checkError(...times) {

    const [day, month, year] = times   
    let [yearErr, monthErr, dayErr] = [true, true, true]

    // check for year
    if (!year.value) {
        year.nextSibling.nextSibling.innerText = 'This field is required'
        applyColor(year, 'hsl(0, 100%, 67%)')
    } else if (new Date().getFullYear() < +year.value) {
        year.nextSibling.nextSibling.innerText = 'Must be in the past'
        applyColor(year, 'hsl(0, 100%, 67%)')
    }  else {
        year.nextSibling.nextSibling.innerText = ''
        yearErr = false
        applyColor(year, 'hsl(259, 100%, 65%)')
    }
    
    // check for month
    const daysInMonth = data[+month.value - 1]
    if (!month.value) {
        month.nextSibling.nextSibling.innerText = 'This field is required'
        applyColor(month, 'hsl(0, 100%, 67%)')
    } else if (daysInMonth === undefined) {
        month.nextSibling.nextSibling.innerText = 'Must be a valid month'
        applyColor(month, 'hsl(0, 100%, 67%)')
    } else if (+month.value > new Date().getMonth() + 1 && +year.value === new Date().getFullYear()) {
        month.nextSibling.nextSibling.innerText = 'Must be in the past'
        applyColor(month, 'hsl(0, 100%, 67%)')
    } else {
        month.nextSibling.nextSibling.innerText = ''
        monthErr = false
        applyColor(month, 'hsl(259, 100%, 65%)')
    }
    
    // check for day
    if (day.value === '') {
        day.nextSibling.nextSibling.innerText = 'This field is required'
        applyColor(day, 'hsl(0, 100%, 67%)')
    } else if (+day.value < 1 || +day.value > daysInMonth || +day.value > 31) {
        day.nextSibling.nextSibling.innerText = 'Must be a valid day '
        applyColor(day, 'hsl(0, 100%, 67%)')
    } else if (+month.value === new Date().getMonth() + 1 
                && +day.value > new Date().getDate()
                && +year.value === new Date().getFullYear()) {
        day.nextSibling.nextSibling.innerText = 'Must be in the past'
        applyColor(day, 'hsl(0, 100%, 67%)')
    }  else {
        day.nextSibling.nextSibling.innerText = ''
        dayErr = false
        applyColor(day, 'hsl(259, 100%, 65%)')
    }

    if (!yearErr && !monthErr && !dayErr) {
        calcAge(+day.value, +month.value, +year.value)
    }
}

function calcAge(...times) {
    const [d1, m1, y1] = times 
  
    let date = new Date();
    let d2 = date.getDate();
    let m2 = 1 + date.getMonth();
    let y2 = date.getFullYear();
    let monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (d1 > d2) {
      d2 = d2 + monthArr[m2 - 1];
      m2 = m2 - 1;
    } 
    if (m1 > m2) {
      m2 = m2 + 12;
      y2 = y2 - 1;
    }
    let d = d2 - d1;
    let m = m2 - m1;
    let y = y2 - y1;

    document.querySelector('.result').classList.add('active')

    document.querySelector('.days span').innerText = d
    document.querySelector('.months span').innerText = m
    document.querySelector('.years span').innerHTML = y
}

function applyColor(time, color) {
    if (color === 'hsl(0, 100%, 67%)') {
        time.previousSibling.previousSibling.style.color = color
    } else {
        time.previousSibling.previousSibling.style.color = 'hsl(0, 1%, 44%)'
    }
    time.style.outlineColor = color
    time.style.borderColor = color
}

// const [day, month, year] = times   
    
// // check for year
// if (!year.value) {
//     year.nextSibling.nextSibling.innerText = 'This field is required'
// } else if (new Date().getFullYear() < +year.value) {
//     year.nextSibling.nextSibling.innerText = 'Must be in the past'
// } else {
//     year.nextSibling.nextSibling.innerText = ''
// }

// // check for month
// const daysInMonth = data[+month.value - 1]
// if (!month.value) {
//     month.nextSibling.nextSibling.innerText = 'This field is required'
// } else if (daysInMonth === undefined) {
//     month.nextSibling.nextSibling.innerText = 'Must be a valid month'
// } else {
//     month.nextSibling.nextSibling.innerText = ''
// }

// // check for day
// if (day.value === '') {
//     day.nextSibling.nextSibling.innerText = 'This field is required'
// } else if (+day.value < 1 || +day.value > daysInMonth) {
//     day.nextSibling.nextSibling.innerText = 'Must be a valid day '
// } else {
//     day.nextSibling.nextSibling.innerText = ''
// }

// frankuxur