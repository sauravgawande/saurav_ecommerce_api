const jwt = require('jsonwebtoken');
const JWT_SECRET = '1234567';


exports.verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token not provided or in invalid format.' });
  }

  const token = authHeader.split(' ')[1]; 
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.userId = decodedToken.userId; 
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};
