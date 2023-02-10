
const requestLogger = (req, res, next)  => {
    next();
    console.log("Request recived: url = ", req.url, " baseUrl = ", req.baseUrl, " originalUrl = ", req.originalUrl, " method = ", req.method, " hostname = ", req.hostname, " body = ", req.body);
};

module.exports = requestLogger;