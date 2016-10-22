var countryMapper = require('country-mapper');
var mapperData = require('./content/mapper.json');
var country = require('country-data');
var lookup = country.lookup;

var getAreaCode = function (country, city) {
    var data = _findData(country, city) || {};
    return (data.area_code || null);
};

var getDialingCode = function (country, city) {
    var data = _findData(country, city) || {};
    var callingCode = data.dialing_code;
    if (callingCode) {
        return (data.dialing_code);
    }
    var alpha2 = countryMapper.convert(country);
    var countries = lookup.countries({
        alpha2: alpha2
    });
    var ref;
    return ((ref = countries[0]) != null ? ref.countryCallingCodes[0] : void 0);
};

var _findData = function (country, city) {
    if (!city || !country) return (null);
    city = city.toLowerCase();
    var alpha2 = countryMapper.convert(country) || country;
    var paths = mapperData[alpha2] || [];
    for (var i = 0; i < paths.length; ++i) {
        var cities = require('./content' + paths[i]);
        var data = cities.find(function (item) {
            var name = item.city || '';
            var stateCapital = item.state_capital || '';
            var state = item.state || '';
            return city == name.toLowerCase() || city == stateCapital.toLowerCase() || city == state.toLowerCase();
        });
        if (data) {
            return (data);
        }
    }
    return (null);
};

module.exports = {
    getAreaCode: getAreaCode,
    getDialingCode: getDialingCode
};
