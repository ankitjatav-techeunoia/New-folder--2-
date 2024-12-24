// Middleware to check if user is logged in
function preventLoggedInAccess(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) { 
        // Redirect logged-in users to the dashboard
        return res.redirect('/auth/dashboard');
    }
    next(); // Proceed to the login route
}
module.exports = preventLoggedInAccess;