import './styles/style.css';
import { throttle } from './scripts/utils';

const decks = document.querySelectorAll('.deck');

const getViewportCenter = () => {
    const x = document.documentElement.clientWidth / 2;
    const y = document.documentElement.clientHeight / 2;
    return [x, y];
};

const getElementPosition = (element) => {
    const { x, top: y } = element.getBoundingClientRect();
    return [x, y];
};

const getElementRelativePosition = (element) => {
    const [x, y] = getElementPosition(element);
    const [centerX, centerY] = getViewportCenter();
    const position = [];
    const docW = document.documentElement.clientWidth;
    const docH = document.documentElement.clientHeight;
    const elemW = element.getBoundingClientRect().width;
    const elemH = element.getBoundingClientRect().height;

    /* eslint-disable-next-line */
    x + elemW / 2 >= centerX
        ? position.push(x - docW / 2 + elemW / 2)
        : position.push(x + elemW / 2 - docW / 2);

    /* eslint-disable-next-line */
    y + elemH / 2 >= centerY
        ? position.push(y - docH / 2 + elemH / 2)
        : position.push(y + elemH / 2 - docH / 2);

    return position;
};

const translateElement = (element, maxTranslate = '5', scale = '1') => {
    const [offsetX, offsetY] = getElementRelativePosition(element);
    const translateAmountX = (
        (maxTranslate * offsetX)
        / (document.documentElement.clientWidth / 2)
    ).toFixed(2);
    const translateAmountY = (
        (maxTranslate * offsetY)
        / (document.documentElement.clientHeight / 2)
    ).toFixed(2);

    /* eslint-disable-next-line */
    element.style.transform = `translateX(${-translateAmountX}rem) translateY(${-translateAmountY}rem) scale(${scale})`;
};

const updateElementsPosition = (elements) => {
    elements.forEach((deck) => {
        deck.querySelectorAll('.card').forEach((card) => {
            if (card.classList.contains('card--1')) translateElement(card, 0);
            if (card.classList.contains('card--2')) translateElement(card, 7, 0.92);
            if (card.classList.contains('card--3')) translateElement(card, 14, 0.85);
        });
    });
};

updateElementsPosition(decks);
updateElementsPosition(decks);

document.addEventListener('scroll', () => {
    console.log('updating...');
    throttle(updateElementsPosition(decks), 16);
});

//
// START CALCULATING FROM PARENT ELEMENT
//
