function randomText(length) {
    let result = Array.from(Array(length), () => Math.floor(Math.random() * 36).toString(36));
    return result.map(
        (el) => {
           const test = Math.random();
           return test > 0.5 ? el.toUpperCase(): el;
        }
    ).join('');
}
module.exports = randomText;