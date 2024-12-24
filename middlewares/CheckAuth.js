// middleware/checkAuth.js
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
      // User is authenticated, proceed to the next middleware/route
      return next();
    }
    // User is not authenticated, redirect to login or return a 401 error
    res.status(401).json({ message: 'Unauthorized. Please log in to access this resource.' });
  }
  
  module.exports = checkAuth;
  