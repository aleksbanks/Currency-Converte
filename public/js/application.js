document.addEventListener('click', (e) => {
  if (e.target.classList.contains('addToFave')) {

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
