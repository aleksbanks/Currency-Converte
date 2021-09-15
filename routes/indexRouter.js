const router = require('express').Router();

const fetch = require('node-fetch');
router.route('/')
  .get(async (req, res) => {
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
        Nominal: valute.Nominal,
        Value: valute.Value.toFixed(2)
      }
      allCurrencies.push(currency)
    }

    res.render('index', { allCurrencies })
  })

module.exports = router;
