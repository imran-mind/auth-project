const jwt = require('jsonwebtoken');

const ensureAuthenticate = (req, res, next) => {
    console.log(req.headers['authorization']);
    if (!req.headers['authorization']) {
        return res.status(403).json({ message: 'jwt token is required' });
    }
    try {
        var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET);
        req.userInfo = decoded;
        return next();
    } catch (err) {
        console.log('Error ',err);
        return res.status(403).json({ message: 'Token is not valid OR expired' });
    }
}

module.exports = ensureAuthenticate;