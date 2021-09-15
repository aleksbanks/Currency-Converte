const router = require('express').Router();

const fetch = require('node-fetch');

router.route('/')
  .get(async (req, res) => {
    console.log(123);
    const rates = {};
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    const keys = Object.keys(result.Valute)

    const allCurrencies = []
    for (let i = 0; i < keys.length; i++) {
      const valute = result.Valute[keys[i]]
      const currency = {
        CharCode: keys[i],
        Name: valute.Name,
      }
      allCurrencies.push(currency)
    }

    res.render('convertor', { allCurrencies })
  })

module.exports = router;
