function random(min, max) {
    const rdm = parseInt((Math.random()*10).toFixed(0));
    const range = max - min;
    const result = rdm > 0 ? parseInt((range/rdm).toFixed(0)) : 0;
    return min + result;
}

module.exports = random