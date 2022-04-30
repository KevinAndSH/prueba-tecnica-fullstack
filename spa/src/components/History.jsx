import { useEffect, useState } from 'react'

function History() {
  const url = "https://bigint-api.herokuapp.com/records"

  const [endpoint, setEndpoint] = useState(url)
  const [records, setRecords] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [prevLink, setPrevLink] = useState(null)
  const [nextLink, setNextLink] = useState(null)
  const [message, setMessage] = useState("No history")

  useEffect(() => {
    setRecords([])
    setLoading(true)
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setRecords(data.data.entries)
        setPrevLink(data.prev)
        setNextLink(data.next)
      })
      .catch(err => {
        console.error(err)
        setMessage("Error!!")
      })
      .finally(() => setLoading(false))
  }, [endpoint])

  const prevPage = () => {
    setEndpoint(prevLink)
  }

  const nextPage = () => {
    setEndpoint(nextLink)
  }

  const deleteHistory = async () => {
    const assertion = window.confirm("Are you sure you want to delete history?")
    if (!assertion) return
    const anotherAssertion = window.confirm("Are you really sure you want to delete history?")
    if (!anotherAssertion) return
    const yetAnotherAssertion = window.confirm("Are you really, REALLY sure you want to delete history?")
    if (!yetAnotherAssertion) return

    try {
      await fetch(url, { method: "DELETE" })
      setRecords([])
      alert("History deleted successfully")
    } catch (error) {
      console.error(error)
      alert("Error deleting history :(")
    }
  }

  return (
    <>
      <div className="btn-container">
        <button data-text="Prev" disabled={!prevLink} onClick={prevPage} />
        <button data-text="Next" disabled={!nextLink} onClick={nextPage} />
      </div>

      {
        isLoading
        ?
        <div className="btn-container">
          Loading...
        </div>
        :
        records.length
        ?
        <table>
          <thead>
            <tr>
              <th>Factor 1</th>
              <th>Factor 2</th>
              <th>Result</th>
              <th>Saved At</th>
            </tr>
          </thead>
          <tbody>
            {
              records.map(record => (
                <tr key={record.createdAt}>
                  <td>{ record.operators[0] }</td>
                  <td>{ record.operators[1] }</td>
                  <td>{ record.result }</td>
                  <td>{ new Date(record.createdAt).toLocaleString() }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        :
        <div className="btn-container">
          { message }
        </div> 
      }

      <div className="btn-container">
        <button data-text="Delete History" onClick={deleteHistory} disabled={!records.length} />
      </div>
    </>
  )
}

export default History
