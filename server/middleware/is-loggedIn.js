module.exports = async (req, res, next) => {
    if(!req.session.isLoggedIn) {
        return res.send({ message: 'Please log in or sign up before.' });
    };
    next();
};