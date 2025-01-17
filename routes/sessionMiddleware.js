// sessionMiddleware.js
export const checkSession = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }
    next();
};
