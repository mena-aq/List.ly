const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{

    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'Access denied (no header)' });

    const token = authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) return res.status(401).json({ error: 'Access denied (no token)' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        console.log(req.userId);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = auth;