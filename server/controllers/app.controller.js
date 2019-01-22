function index(req, res) {
  res.status(200)
    .json({
      success: true,
      message: ''
    });
}

module.exports = {
  index
};
