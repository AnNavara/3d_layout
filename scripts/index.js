(()=>{
    const decks = document.querySelectorAll('.deck')
    const header = document.querySelector('.working')
    const dot = document.createElement('div');

    const getViewportCenter = function () {
        const x = (document.documentElement.getBoundingClientRect().x + document.documentElement.getBoundingClientRect().width) / 2
        const y = -document.documentElement.getBoundingClientRect().top + document.documentElement.clientHeight / 2
        return [x, y]
    }

    const getElementPosition = function (element) {
        return [element.getBoundingClientRect().x, element.getBoundingClientRect().y]
    }

    const updateElementsPosition = function (elements) {
        elements.forEach(e => {
            e.querySelector('.card').innerHTML = getElementPosition(e).join(' ')
        })
    }

    const createDot = function (dot) {
        dot.style.backgroundColor = 'crimson'
        dot.style.width = '4rem'
        dot.style.height = '4rem'
        dot.style.position = 'absolute'
        dot.style.zIndex = '10000';
        document.querySelector('.container').appendChild(dot)
        updateDot(dot)
    }

    const updateDot = function (dot) {
        dot.innerHTML = getViewportCenter().join(' ')
        dot.style.left = getViewportCenter()[0] - 20 + 'px'
        dot.style.top = getViewportCenter()[1] - 20 + 'px'
    }

    createDot(dot)
    updateElementsPosition(decks)
    document.querySelector('.working').innerHTML = getViewportCenter().join(' ')

    document.addEventListener('scroll', (e) => {
        console.log('updating...')
        header.innerHTML = getViewportCenter().join(' ')
        updateDot(dot)
        updateElementsPosition(decks)
    })
})();
