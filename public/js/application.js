const body = document.querySelector('body')

document.addEventListener("DOMContentLoaded", async function () {
  if (location.pathname === '/') {

    const allCurrencies = JSON.parse(localStorage.getItem('allCurrencies'))
    if (allCurrencies) {
      const responseServer = await fetch('/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ allCurrencies })
      })
      const result = await responseServer.text();
      body.innerHTML = result
    } else {
      const rates = {};
      const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
      const data = await response.json();
      const result = await data;

      const keys = Object.keys(result.Valute)

      const currencies = []
      for (let i = 0; i < keys.length; i++) {
        const valute = result.Valute[keys[i]]
        const currency = {
          CharCode: keys[i],
          Name: valute.Name,
          Nominal: valute.Nominal,
          Value: valute.Value.toFixed(2),
          Favourite: false,
        }
        currencies.push(currency)
      }
      localStorage.setItem("allCurrencies", JSON.stringify(currencies))

      const responseServer = await fetch('/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ allCurrencies: currencies })
      })
    }
  }
});


document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('addToFave')) {
    console.log('hi1');
    e.preventDefault()
    e.target.classList.toggle("fav")
    const allCurrencies = JSON.parse(localStorage.getItem('allCurrencies'))
    allCurrencies.map((el) => {
      if (el.CharCode === e.target.name) {
        el.Favourite = !el.Favourite
        return el
      } else {
        return el
      }
    })
    localStorage.setItem("allCurrencies", JSON.stringify(allCurrencies))

    const responseServer = await fetch('/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ allCurrencies })
    })
    // const result = await responseServer.text();
    // body.innerHTML = result

  }
})

const rubInput = document.querySelector('.rubInput')
const resultInput = document.querySelector('.resultInput')
const valuteSelect = document.querySelector('.resultSelect')


document.addEventListener('change', async (e) => {
  if (e.target.classList.contains('resultSelect')) {
    const responseForRates = await fetch('https://www.cbr-xml-daily.ru/latest.js');
    const dataForRates = await responseForRates.json();
    const resultForRates = await dataForRates.rates;

    resultInput.value = (rubInput.value * await resultForRates[e.target.value]).toFixed(2)
  }
})

document.addEventListener('input', async (e) => {
  if (e.target.classList.contains('rubInput')) {
    const responseForRates = await fetch('https://www.cbr-xml-daily.ru/latest.js');
    const dataForRates = await responseForRates.json();
    const resultForRates = await dataForRates.rates;
    resultInput.value = (rubInput.value * await resultForRates[valuteSelect.value]).toFixed(2)
  }
  else if (e.target.classList.contains('resultInput')) {
    const responseForRates = await fetch('https://www.cbr-xml-daily.ru/latest.js');
    const dataForRates = await responseForRates.json();
    const resultForRates = await dataForRates.rates;
    rubInput.value = (resultInput.value / await resultForRates[valuteSelect.value]).toFixed(2)
  }
})
