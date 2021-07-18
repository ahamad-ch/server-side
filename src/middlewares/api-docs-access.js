const apiDocsAccess = (req, res, next) => {
  if (process.env.DOCS_DISABLED) return res.sendStatus(404)
  else next()
}

module.exports = { apiDocsAccess }
