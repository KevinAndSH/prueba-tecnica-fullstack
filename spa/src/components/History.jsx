import React, { useEffect, useState } from 'react'

function History() {
  const url = "https://bigint-api.herokuapp.com/records"

  const [records, setRecords] = useState([])
  const [page, setPage] = useState(1)
  const [amount, setAmount] = useState(10)
  const [prevLink, setPrevLink] = useState(null)
  const [nextLink, setNextLink] = useState(null)

  useEffect(() => {
    setRecords([])
    fetch(`${url}?page=${page}&amount=${amount}`)
      .then(res => res.json())
      .then(data => {
        setRecords(data.data.entries)
        setPrevLink(data.prev)
        setNextLink(data.next)
      })
  }, [amount, page])

  const prevPage = () => {
    setPage(page => page - 1)
  }

  const nextPage = () => {
    setPage(page => page + 1)
  }

  const deleteHistory = () => {
    const assertion = window.confirm("Are you sure you want to delete history?")
    if (assertion) {
      fetch(url, { method: "DELETE" }).then(() => setRecords([]))
    }
  }

  return (
    <>
      <div className="btn-container">
        <button data-text="Prev" disabled={!prevLink} onClick={prevPage} />
        <button data-text="Next" disabled={!nextLink} onClick={nextPage} />
      </div>

      {
        records.length ?
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
        </table> :
        <div className="btn-container">
          No history
        </div> 
      }

      <div className="btn-container">
        <button data-text="Delete History" onClick={deleteHistory} disabled={!records.length} />
      </div>
    </>
  )
}

export default History
