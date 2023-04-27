import './CurrencyInput.css'

function CurrencyInput({
  options,
  currency,
  amount,
  handleCurrencyChange,
  handleAmountChange
}) {
  return (
    <div className="converter-container">
      <h4>I have / I Want</h4>
      <select
        name="currency"
        value={currency}
        onChange={handleCurrencyChange}
      >
        {
          Object.keys(options).map(key => {
            return (
              <option key={key} value={key}>
                {options[key]}
              </option>
            )
          })
        }
      </select>
      <input
        type="number"
        min="0"
        max="100000"
        step="1"
        value={amount}
        onChange={handleAmountChange}
      />
    </div>
  )
}

export default CurrencyInput;