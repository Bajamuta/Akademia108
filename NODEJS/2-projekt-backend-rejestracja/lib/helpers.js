function notHome(title) {
    return title !== 'Home';
}

function findError(result, name) {
    return result.errors ? result.errors.find((elem) => elem.param === name) : null;
}

function showError(result, name) {
    return findError(result, name).msg;
}

function getValue(result, name) {
    console.log('resu', result);
    if (result)
    {
        const obj =  Object.entries(result).find(([key, value]) => {
            return key === name
        });
        return obj ? obj[1] : null;
    }
    return null;
}

function selected(result, name, compare){
    const val = getValue(result, name);
    console.log('selected', val, compare);
    return val ? val === compare : false;
}

module.exports = {
    notHome,
    findError,
    showError,
    getValue,
    selected
}
