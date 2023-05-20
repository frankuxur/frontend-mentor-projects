const bars = document.querySelectorAll('.bar__div')

bars.forEach(bar => bar.addEventListener('mouseover', (event) => {
    const barParent = event.target.closest('.bar')
    barParent.querySelector('.expense').style.opacity = '1'
}))

bars.forEach(bar => bar.addEventListener('mouseout', (event) => {
    const barParent = event.target.closest('.bar')
    barParent.querySelector('.expense').style.opacity = '0'
}))

function setBars(data) {
    bars.forEach((bar, index) => {
        const amount = data[index].amount/10
        bar.style.height = `${amount + 1.4}rem`
        const barParent = bar.closest('.bar')
        barParent.querySelector('.expense span').innerText = `${amount * 10}`
    })
}

const getData = async () => {
    const res = await fetch("./data.json")
    const data = await res.json()

    setBars(data);
    highlightCurrentDay(data)
}

getData()

function highlightCurrentDay (data) {
    let current = new Date().getDay()
    let currentDay
    if (current === 0) currentDay = data[6]
    else currentDay = data[current - 1]

    bars[data.indexOf(currentDay)].style.backgroundColor = 'var(--Cyan)'
} 

// frankuxur