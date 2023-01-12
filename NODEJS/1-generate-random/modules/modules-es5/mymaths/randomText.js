function randomText(length) {
    let result = '';
    Array.from(Array(length), () => Math.floor(Math.random() * 36).toString(36)).join('');
    for (let i = 0; i < length; i ++)
    {
        result += Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
    }
    return result;
}
module.exports = randomText;