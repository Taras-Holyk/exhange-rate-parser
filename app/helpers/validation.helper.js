function processErrors(req, res, next) {
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400)
      .json(errors);
  }

  return next();
}

module.exports = {
  processErrors: processErrors
};
