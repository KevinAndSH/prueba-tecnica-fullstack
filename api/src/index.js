const mongoose = require("mongoose")
const app = require("./app")
const port = process.env.PORT

mongoose.set("debug", process.env.NODE_ENV === "development")
mongoose.connect(process.env.DB_URI).then(() => console.log("Connected to the database"))

app.listen(port, () => console.log("Server running in port", port))
