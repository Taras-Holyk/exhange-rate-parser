function index(req, res) {
    res.status(200)
        .json({
            message: ''
        });
}

module.exports = {
    index
};