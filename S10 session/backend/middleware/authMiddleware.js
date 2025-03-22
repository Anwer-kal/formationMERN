module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized: Please log in' });
  }

  req.user = req.session.user; // Attach user session data to the request object
  next(); // Proceed to the next middleware or route handler
};