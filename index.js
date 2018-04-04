const countryMapper = require('country-mapper')
const country = require('country-data')
const mapperData = require('./content/mapper.json')
const lookup = country.lookup

let getAreaCode = (country, city) => {
  let data = _findData(country, city) || {}
  return (data.area_code || null)
}

let getDialingCode = (country, city) => {
  let data = _findData(country, city) || {}
  let callingCode = data.dialing_code
  if (callingCode) {
    return (data.dialing_code)
  }
  let alpha2 = countryMapper.convert(country)
  let countries = lookup.countries({
    alpha2
  })
  let ref = countries[0]
  return (ref != null ? ref.countryCallingCodes[0] : null)
}

let _findData = (country, city) => {
  if (!city || !country) return (null)
  city = city.toLowerCase()
  let alpha2 = countryMapper.convert(country) || country
  let paths = mapperData[alpha2] || []
  for (let i = 0; i < paths.length; ++i) {
    let cities = require('./content' + paths[i])
    let data = cities.find((item) => {
      let name = item.city || ''
      // stateCapital and state contains in USA regions
      let stateCapital = item.state_capital || ''
      let state = item.state || ''
      // stage 0 matching by name
      let res = city == name.toLowerCase() || city == stateCapital.toLowerCase() || city == state.toLowerCase()
      if (!!res) return res
      // stage 1 matching by name using regexp
      try {
        return name && new RegExp(city, 'i').test(name) ||
          stateCapital && new RegExp(city, 'i').test(stateCapital) ||
          state && new RegExp(city, 'i').test(state)
      } catch (err) {
        return null
      }
    })
    if (data) {
      return (data)
    }
  }
  return (null)
}

module.exports = {
  getAreaCode,
  getDialingCode
}
