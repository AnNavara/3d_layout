const dot = document.createElement('div');
const container = document.querySelector('.container');

const getCorrectedViewportCenter = function () {
    const x = document.documentElement.clientWidth / 2;
    const y =
        document.documentElement.clientHeight / 2 -
        document.documentElement.getBoundingClientRect().top;
    return [x, y];
};

const createDot = function (dot) {
    dot.style.backgroundColor = 'crimson';
    dot.style.width = '4rem';
    dot.style.height = '4rem';
    dot.style.position = 'absolute';
    dot.style.zIndex = '10000';
    container.appendChild(dot);
    updateDot(dot);
};

const updateDot = function (dot) {
    dot.innerHTML = getCorrectedViewportCenter().join(' ');
    dot.style.left = getCorrectedViewportCenter()[0] - 20 + 'px';
    dot.style.top = getCorrectedViewportCenter()[1] - 20 + 'px';
};
