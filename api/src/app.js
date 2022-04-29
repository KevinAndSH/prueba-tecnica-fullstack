const express = require("express")
const app = express()

const cors = require("cors")

const { multiply } = require("./controllers/operations.controller")
const { getRecords, deleteAll } = require("./controllers/records.controller")

app.use(cors())

app.get("/multiply", multiply)
app.get("/records", getRecords)
app.delete("/records", deleteAll)

module.exports = app
