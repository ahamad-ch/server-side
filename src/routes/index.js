const app = (module.exports = require("express")())

/**
 * @swagger
 * /welcome:
 *  get:
 *    description: Use to test api
 *    responses:
 *      '200':
 *        description: success
 */

app.use("/welcome", (req, res) => {
  res.json("Welcome To Admin Services.")
})
