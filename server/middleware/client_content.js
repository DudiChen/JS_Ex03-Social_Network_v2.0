

const client_content = (req, res, next) => {
    res.setHeader("Content-Type", "text/html");
    next();
};


module.exports = client_content;