import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function Calculator() {
  const url = "https://bigint-api.herokuapp.com/multiply"

  const [result, setResult] = useState("")

  const factorRef1 = useRef(null)
  const factorRef2 = useRef(null)

  const calculate = async e => {
    e.preventDefault()
    setResult("Calculating...")

    try {
      const res = await fetch(`${url}?factor1=${factorRef1.current.value}&factor2=${factorRef2.current.value}`)
      const { data } = await res.json()
      setResult(data.result)
    } catch (error) {
      console.error(error)
      setResult("Error!")
    }
  }

  const nanBlock = e => {
    if (/[.+-]/.test(e.key)) e.preventDefault()
  }

  return (
    <form className="form" onSubmit={calculate}>
      <input type="number" className="form--input" defaultValue="12" onKeyDown={nanBlock} ref={factorRef1} />
      <input type="number" className="form--input" defaultValue="24" onKeyDown={nanBlock} ref={factorRef2} />
      <input type="submit" className="form--btn" value="Multiply" />

      <input className="form--input" value={result} readOnly/>
      <Link to="/history" className="history-link">
        History
      </Link>
    </form>
  )
}

export default Calculator
