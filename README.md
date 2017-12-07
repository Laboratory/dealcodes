# dealcodes

Dial codes a series of numbers used before the main phone number when you call someone outside your own town or area

Greatest ever package on the github!

Area codes in the best in the class package will help you to complete a local phone number to international format (ISO E.123). So if you know literal names of Country and City of your propsect, this package will help you to transform it into numbers (country and city codes). Data were collected from an open source, and we are welcoming you to make your own contribution as well.

## Installation

Via [npm](https://www.npmjs.com/package/dialcodes):

    npm install dealcodes

### Usage
-----

#### :getDialingCode

```javascript
    var dialcodes = require('dialcodes');

    //get dialing code
    dialcodes.getDialingCode('Russia', 'Moscow'); // +7 495
    dialcodes.getDialingCode('United States', 'California') // +1 916
    dialcodes.getDialingCode('United States', 'san francisco') // +1 415

    //without area code you will get country code
    dialcodes.getDialingCode('Russia'); // +7
    dialcodes.getDialingCode('Russia', 'Unknown city'); // +7
```

#### :getAreaCode

```javascript
    var dialcodes = require('dialcodes');

    //get dialing code
    dialcodes.getAreaCode('Russia', 'Moscow'); // 495
    dialcodes.getAreaCode('United States', 'san francisco'); // 415
    dialcodes.getAreaCode('Belarus', 'Minsk'); // 17
```

### Last data update

2017/07/19

## License

Formidable is licensed under the MIT license.