
const is_admin = (req, res, next) => {
    req.user.is_admin = user.id == 1;
    next();
}

module.exports = is_admin;
