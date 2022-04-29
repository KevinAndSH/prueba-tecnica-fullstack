const Record = require("../models/record.model")

module.exports = {
  async getRecords(req, res) {
    // Define a base Rest API response to work with
    const response = {
      status: 200,
      prev: null,
      next: null,
      data: {
        count: null,
        entries: null
      },
    }
  
    // Get the page number
    const page = parseInt(req.query.page) || 1

    // Amount of entries per page
    const amount = req.query.amount === "all" ? null : parseInt(req.query.amount) || 10

    // Get the current url (needed for pagination purposes)
    const currentUrl = `${req.protocol}://${req.headers.host}${req.path}`

    try {
      response.data.count = await Record.countDocuments()
      response.data.entries = await Record.find().limit(amount).skip(amount * (page - 1)).select("-_id -__v")
      if (page !== 1) {
        response.prev = `${currentUrl}?page=${(page - 1)}&amount=${amount}`
      }
      if (amount && page * amount < response.data.count) {
        response.next = `${currentUrl}?page=${(page + 1)}&amount=${amount}`
      }
    } catch (error) {
      response.status = 500
      response.message = error.message
    } finally {
      res.json(response)
    }
  },

  async deleteAll(req, res) {
    // Define a base Rest API response to work with
    const response = {
      status: 200
    }

    try {
      await Record.deleteMany()
      response.status = 204
    } catch (error) {
      response.status = 500
      response.message = error.message
    } finally {
      res.json(response)
    }
  }
}
