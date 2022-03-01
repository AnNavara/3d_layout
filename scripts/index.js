(()=>{
    const decks = document.querySelectorAll('.deck')
    const container = document.querySelector('.container')
    const dot = document.createElement('div');

    const getViewportCenter = function () {
        const x = document.documentElement.clientWidth / 2
        const y = document.documentElement.clientHeight / 2
        return [x, y]
    }

    const getCorrectedViewportCenter = function () {
        const x = document.documentElement.clientWidth / 2
        const y = document.documentElement.clientHeight / 2 - document.documentElement.getBoundingClientRect().top
        return [x, y]
    }

    const getElementPosition = function (element) {
        const x = element.getBoundingClientRect().x
        const y = element.getBoundingClientRect().top
        return [x, y]
    }

    const getElementRelativePosition = function (element) {
        const [x, y] = getElementPosition(element)
        const [centerX, centerY] = getViewportCenter()
        const position = [];
        const docW = document.documentElement.clientWidth
        const docH = document.documentElement.clientHeight
        const elemW = element.getBoundingClientRect().width
        const elemH = element.getBoundingClientRect().height

        // x + element.getBoundingClientRect().width / 2 >= centerX ? position.push('RIGHT') : position.push('LEFT') 
        x + elemW / 2 >= centerX ? position.push(x - docW / 2 + elemW / 2) : position.push(x + elemW / 2 - docW / 2) 
        // y + element.getBoundingClientRect().height / 2 <= centerY ? position.push('HIGHER') : position.push('LOWER') 
        y + elemH / 2 >= centerY ? position.push(y - docH / 2 + elemH / 2) : position.push(y + elemH / 2 - docH / 2) 

        return position
    }

    const updateElementsPosition = function (elements) {
        elements.forEach(deck => {
            deck.querySelectorAll('.card').forEach(card => {
                card.textContent = getElementRelativePosition(card).map(e => Math.round(e)).join(' ')
                if (card.classList.contains('card--1')) translateElement(card, 0)
                if (card.classList.contains('card--2')) translateElement(card, 7, 0.92)
                if (card.classList.contains('card--3')) translateElement(card, 14, 0.85)
            })
        })
    }

    const translateElement = function (element, maxTranslate = '5', scale = '1') {
        const [offsetX, offsetY] = getElementRelativePosition(element);
        const translateAmountX = ((maxTranslate * offsetX) / (document.documentElement.clientWidth / 2)).toFixed(2)
        const translateAmountY = ((maxTranslate * offsetY) / (document.documentElement.clientHeight / 2)).toFixed(2)

        element.style.transform = `translateX(${-translateAmountX}rem) translateY(${-translateAmountY}rem) scale(${scale})`
    }

    const createDot = function (dot) {
        dot.style.backgroundColor = 'crimson'
        dot.style.width = '4rem'
        dot.style.height = '4rem'
        dot.style.position = 'absolute'
        dot.style.zIndex = '10000';
        container.appendChild(dot)
        updateDot(dot)
    }

    const updateDot = function (dot) {
        dot.innerHTML = getCorrectedViewportCenter().join(' ')
        dot.style.left = getCorrectedViewportCenter()[0] - 20 + 'px'
        dot.style.top = getCorrectedViewportCenter()[1] - 20 + 'px'
    }

    const throttle = (fn, delay) => {
        let lastCalled = 0;
        return (...args) => {
          let now = new Date().getTime();
          if(now - lastCalled < delay) {
            return;
          }
          lastCalled = now;
          return fn(...args);
        }
    }

    // createDot(dot)
    updateElementsPosition(decks)
    updateElementsPosition(decks)

    document.addEventListener('scroll', (e) => {
        console.log('updating...')
        // updateDot(dot)
        throttle(updateElementsPosition(decks), 16)
        // updateElementsPosition(decks)
    })

    // 
    // START CALCULATING FROM PARENT ELEMENT
    // 
})();
