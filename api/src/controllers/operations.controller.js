const Record = require("../models/record.model")

module.exports = {
  async multiply(req, res) {
    // Get numbers sent via GET request
    const { factor1, factor2 } = req.query
    
    // Define a base Rest API response to work with
    const response = {
      status: 200,
      data: {
        factors: [factor1, factor2],
        result: null
      }
    }
    
    try {
      // Check if there's a character that's not a number in any of the 2 factors sent
      if (/[^0-9]/.test(factor1 + factor2)) {
        response.status = 400
        response.message = "Only numbers allowed"
        return
      }
    
      // Convert the factors into Big Integers
      const [bigFac1, bigFac2] = [BigInt(factor1), BigInt(factor2)]
      response.data.result = (bigFac1 * bigFac2).toString()
  
      // Create a record and save it in the database
      const record = new Record({
        operators: [bigFac1, bigFac2],
        result: response.data.result
      })
      await record.save()
      response.status = 201
    } catch (error) {
      response.message = error.message
    } finally {
      res.json(response)
    }
  },
}
