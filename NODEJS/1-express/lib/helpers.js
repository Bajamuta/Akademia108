function fullAddress(address, options) {
    return address.street + ', ' + address.suite + ', ' + address.zipcode + ' ' + address.city + ' (lat: ' + address.geo.lat + ', lng: ' + address.geo.lng + ')';
}

module.exports = {
    fullAddress
}
