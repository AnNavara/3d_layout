(()=>{
    const decks = document.querySelectorAll('.deck')
    const header = document.querySelector('.working')
    const dot = document.createElement('div');

    const getViewportCenter = function () {
        const x = document.documentElement.clientWidth / 2
        const y = document.documentElement.clientHeight / 2 - document.documentElement.getBoundingClientRect().top
        return [x, y]
    }

    const getElementPosition = function (element) {
        const x = element.getBoundingClientRect().x + element.getBoundingClientRect().width / 2
        const y = element.getBoundingClientRect().top + element.getBoundingClientRect().height / 2 - document.documentElement.getBoundingClientRect().top
        return [x, y]
    }

    const getElementRelativePosition = function (element) {
        const [x, y] = getElementPosition(element)
        const [centerX, centerY] = getViewportCenter()
        const positionText = [];

        x >= centerX ? positionText.push('Right') : positionText.push('Left') 
        y <= centerY ? positionText.push('Up') : positionText.push('Down')

        return positionText.join(' ') + ' Self Position: ' + y + ' Center: ' + centerY
    }

    const updateElementsPosition = function (elements) {
        elements.forEach(e => {
            e.querySelector('.card').innerHTML = getElementRelativePosition(e);
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
