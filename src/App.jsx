import { useEffect, useState } from 'react'
import './App.css'
import CurrencyInput from './components/CurrencyInput'
import CurrencyChart from './components/CurrencyChart';

const API_URL = "http://api.frankfurter.app";

function App() {
  const [currencies, setCurrencies] = useState(null);
  const [state, setState] = useState({
    fromAmount: 1,
    toAmount: 1,
    fromCurrency: "EUR",
    toCurrency: "USD",
    timeserie: null,
  });

  async function handleCurrencyChange(event, origin) {
    // console.log("[SELECT]", event.target.value, origin);
    const newCurrency = event.target.value;
    if (origin === "from") {
      const newValue = await convertAmount(state.fromAmount, state.toCurrency, newCurrency);
      setState({
        ...state,
        fromAmount: newValue || 1,
        fromCurrency: newCurrency,
      });
    } else if (origin === "to") {
      const newValue = await convertAmount(state.fromAmount, state.fromCurrency, newCurrency);
      setState({
        ...state,
        toAmount: newValue || 1,
        toCurrency: newCurrency,
      });
    }
  }

  async function handleAmountChange(event, origin) {
    // console.log("[INPUT]", event.target.value, origin);
    const newAmount = event.target.value;
    
    if (newAmount === "") {
      return;
    }

    if (origin === "from") {
      const newValue = await convertAmount(newAmount, state.fromCurrency, state.toCurrency);
      setState({
        ...state,
        fromAmount: newAmount,
        toAmount: newValue,
      })
    } else if (origin === "to") {
      const newValue = await convertAmount(newAmount, state.toCurrency, state.fromCurrency);
      setState({
        ...state,
        toAmount: newAmount,
        fromAmount: newValue,
      })
    }
  }

  async function convertAmount(amount, from, to) {
    if (isNaN(amount) || amount === "" || from === "" || to === "" || from === to) {
      return undefined;
    }

    const response = await fetch(
      `${API_URL}/latest?amount=${amount}&from=${from}&to=${to}`
    );
    const result = await response.json();
    const newValue = result.rates[to];
    return newValue;
  }

  async function getCurrencies() {
    const response = await fetch(`${API_URL}/currencies`);
    const result = await response.json();
    setCurrencies(result);
  }

  async function getTimeserie() {
    if (state.fromCurrency === state.toCurrency) {
      return;
    }

    const endDate = new Date();
    const endDateString = endDate.toISOString().slice(0, 10);
    const startDate = endDate;
    startDate.setMonth(endDate.getMonth() - 1);
    const startDateString = startDate.toISOString().slice(0, 10);
    const response = await fetch(`${API_URL}/${startDateString}..${endDateString}?base=${state.fromCurrency}&to=${state.toCurrency}`);
    const result = await response.json();
    const labels = Object.keys(result.rates);
    const data = labels.map(key => {
      const item = result.rates[key];
      return item[state.toCurrency];
    });
    setState({
      ...state,
      timeserie: {
        labels: labels,
        datasets: [
          {
            label: "1M",
            data: data,
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0,0,0,450);
              gradient.addColorStop(0, 'rgba(0, 0, 255, 0.5)');
              gradient.addColorStop(.5, 'rgba(0, 0, 255, 0.25)');
              gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');
              return gradient;
            },
            borderColor: '#7c52df',
            pointRadius: 0,
            tension: 0.5,
            fill: true,
          }
        ]
      }
    })
  }

  useEffect(() => {
    getCurrencies();
    getTimeserie();
  }, [state.fromCurrency, state.toCurrency]);

  return (
    <>
      <div className="area header">
        <h3>1 EUR uguale a</h3>
        <h2>1.18 USD</h2>
      </div>
      <div className="area chart">
        { state.timeserie !== null && <CurrencyChart data={state.timeserie} /> }
      </div>
      <div className="area converter-from">
        <CurrencyInput
          currency={state.fromCurrency}
          amount={state.fromAmount}
          options={currencies || {}}
          handleCurrencyChange={(event) => handleCurrencyChange(event, "from")}
          handleAmountChange={(event) => handleAmountChange(event, "from")}
        />
      </div>
      <div className="area converter-to">
        <CurrencyInput
          origin="to"
          currency={state.toCurrency}
          amount={state.toAmount}
          options={currencies || {}}
          handleCurrencyChange={(event) => handleCurrencyChange(event, "to")}
          handleAmountChange={(event) => handleAmountChange(event, "to")}
        />
      </div>
    </>
  )
}

export default App
