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
    const [x, y] = getElementPosition(element.parentNode);
    const [centerX, centerY] = getViewportCenter();
    const position = [];
    const docW = document.documentElement.clientWidth;
    const docH = document.documentElement.clientHeight;
    const elemW = element.parentNode.getBoundingClientRect().width;
    const elemH = element.parentNode.getBoundingClientRect().height;

    // LEFT-RIGHT
    /* eslint-disable-next-line */
    x + elemW / 2 >= centerX
        ? position.push(x - docW / 2 + elemW / 2)
        : position.push(x + elemW / 2 - docW / 2);

    // TOP-BOTTOM
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

const translateSelector = (card) => {
    // TODO: Remove magic numbers
    if (card.classList.contains('card--1')) translateElement(card, 0);
    if (card.classList.contains('card--2')) translateElement(card, 6.5, 0.91);
    if (card.classList.contains('card--3')) translateElement(card, 12.5, 0.82);
};

export const updateElementsPosition = (elements) => {
    elements.forEach((deck) => {
        deck.querySelectorAll('.card').forEach((card) => {
            translateSelector(card);
        });
    });
};

export default updateElementsPosition;
export { translateSelector };
