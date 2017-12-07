const chai = require('chai')
const assert = chai.assert
const dialcodes = require('../index')

describe('dialcodes', () => {

  describe('get area code', () => {
    it('should return area code by Country and City name', () => {
      assert.equal(495, dialcodes.getAreaCode('Russia', 'Moscow'))
      assert.equal(916, dialcodes.getAreaCode('United States', 'California'))
      assert.equal(805, dialcodes.getAreaCode('United States', 'santa barbara'))
      assert.equal(415, dialcodes.getAreaCode('United States', 'san francisco'))
      assert.equal(17, dialcodes.getAreaCode('Belarus', 'Minsk'))
      assert.equal(812, dialcodes.getAreaCode('Russia', 'St. Petersburg'))
      assert.equal(null, dialcodes.getAreaCode('Unknown'))
      assert.equal(null, dialcodes.getAreaCode())
    });
  });

  describe('get dialing code', () => {
    it('should return dialing code by Country and City name', () => {
      assert.equal('+7 495', dialcodes.getDialingCode('Russia', 'Moscow'))
      assert.equal('+1 916', dialcodes.getDialingCode('United States', 'California'))
      assert.equal('+1 805', dialcodes.getDialingCode('United States', 'santa barbara'))
      assert.equal('+1 415', dialcodes.getDialingCode('United States', 'san francisco'))
      assert.equal('+375 17', dialcodes.getDialingCode('Belarus', 'Minsk'))
      assert.equal('+7 812', dialcodes.getDialingCode('Russia', 'St. Petersburg'))
      assert.equal('+7', dialcodes.getDialingCode('Russia'))
      assert.equal('+7', dialcodes.getDialingCode('Russia', 'Unknown city'))
      assert.equal(null, dialcodes.getDialingCode('Unknown'))
      assert.equal(null, dialcodes.getDialingCode())
      assert.equal('+52 55', dialcodes.getDialingCode('Mexico', 'Mexico City'))
      assert.equal('+52 55', dialcodes.getDialingCode('Mexico', 'Mexico'))
    })
  })

})