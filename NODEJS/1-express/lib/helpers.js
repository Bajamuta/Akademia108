function arrayList(array, options) {
    console.log('arrat', array);
    return array ? array.map(
        (item, index) => {
            if (index < array.length)
            {
                item = item + ', ';
            }
            return item;
        }
    ) : [];
}

module.exports = {
    arrayList
}
