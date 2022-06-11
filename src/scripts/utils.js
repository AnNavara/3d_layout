const throttle = (fn, delay) => {
    let isWaiting = false;
    let savedArgs = null;
    let savedThis = null;
    return function wrapper(...args) {
        if (isWaiting) {
            savedArgs = args;
            savedThis = this;
            return;
        }

        fn.apply(this, args);

        isWaiting = true;
        setTimeout(() => {
            isWaiting = false;
            if (savedThis) {
                wrapper.apply(savedThis, savedArgs);
                savedThis = null;
                savedArgs = null;
            }
        }, delay);
    };
};

const setStyles = (element, { styles, classes, animationDelay }) => {
    if (styles) {
        Object.keys(styles).forEach((key) => {
            /* eslint-disable-next-line */
            element.style[key] = styles[key];
        });
    }
    if (classes) {
        if (animationDelay) {
            setTimeout(() => {
                classes.forEach((cssClass) => {
                    element.classList.toggle(cssClass);
                });
            }, animationDelay);
        } else {
            classes.forEach((cssClass) => {
                element.classList.toggle(cssClass);
            });
        }
    }
};

export {
    throttle,
    setStyles,
};
