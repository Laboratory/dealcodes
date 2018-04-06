const countryMapper = require('country-mapper')
const lookup = require('country-data').lookup
const mapperData = require('./content/mapper.json')

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

/**
 * return uniq values of array
 * @param Array
 * @returns {*[]}
 */
// let unique = (arr) => {
//   return [...new Set(arr)]
// }

let unique = (arr) => {
  let set = new Set()
  arr.forEach(item => set.add(JSON.stringify(item)))
  let res = []
  set.forEach(item => res.push(JSON.parse(item)))
  return res
}

/**
 * Search location by area code or full phone in E.164 format
 * @param code (area code or phone)
 * @param country (country name)
 * @returns [values]
 */
let getLocationByAreaCode = (code, country) => {
  // get county code
  let alpha2 = countryMapper.convert(country) || country
  let paths = mapperData[alpha2] || []
  // TODO: for USA we can use only main path in future
  // if (alpha2 === 'US') {
  //   paths = [paths[0]]
  // }
  if (paths.length === 0) {
    // create full path for searching
    paths = Object.values(mapperData).reduce((arr1, arr2) => {
      return arr1.concat(arr2)
    })
  }
  const nonDigitRegex = /\D/g
  let res = []
  let newCode = code.replace(nonDigitRegex, '')
  for (let i = 0; i < paths.length; ++i) {
    let cities = require('./content' + paths[i])
    let data = cities.filter((city) => {
      let areaCode = city.area_code
      let dCode = city.dialing_code.replace(nonDigitRegex, '')
      return (areaCode && areaCode.length <= newCode.length && new RegExp(`^${areaCode}`).test(newCode) ||
        dCode && dCode.length <= newCode.length && (new RegExp(`^${dCode}`).test(newCode)))
    })
    if (data.length > 0) {
      res = res.concat(data)
    }
  }
  return (unique(res, 'dialing_code'))
}

module.exports = {
  getAreaCode,
  getDialingCode,
  getLocationByAreaCode
}
