const jwt = require('jsonwebtoken');

// Middleware to protect routes by checking for a valid JWT
module.exports.protect = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Check if the token is in the format 'Bearer <token>'
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Malformed token' });
    }

    const token = authHeader.split(' ')[1];  // Extract the actual token

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'your-secret-key-here');
        req.user = decoded;  // Attach user details to the request object
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Middleware to authorize based on user role
module.exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied. Unauthorized role.' });
        }
        next();
    };
};


