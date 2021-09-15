const router = require('express').Router();

const fetch = require('node-fetch');
router.route('/')
  .get(async (req, res) => {
    res.render('index')
  })

  .post((req, res) => {
    const { allCurrencies } = req.body;
    allCurrencies.sort((a,b) => {
      return b.Favourite - a.Favourite
    })
    res.render('index', { allCurrencies })
  })

module.exports = router;
