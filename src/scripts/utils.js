export const throttle = (fn, delay) => {
    let lastCalled = 0;
    return (...args) => {
        const now = new Date().getTime();
        if (now - lastCalled < delay) {
            return undefined;
        }
        lastCalled = now;
        return fn(...args);
    };
};

export default throttle;
