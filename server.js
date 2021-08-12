const express = require("express")
const i18n = require("i18n")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require("./src/routes/index")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const { apiDocsAccess } = require("./src/middlewares/api-docs-access")

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "BoilerPlate API",
      description: "API BoilerPlate Information",
    },
  },
  apis: ["src/routes/**/*.js"],
}

const app = express()

// cors configuration
const whitelist = []

const options = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
}

i18n.configure({
  defaultLocale: "en",
  locales: ["en", "tr"],
  directory: __dirname + "/src/locales",
  objectNotation: true,
})

// i18n
app.use(i18n.init)

// serve static files
app.use(express.static(path.join(__dirname, "public")))

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors configuration
app.use(cors(options))

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", apiDocsAccess, swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// routes
app.use(routes)

app.listen(process.env.PORT || 1000, () => console.log("app started..."))
