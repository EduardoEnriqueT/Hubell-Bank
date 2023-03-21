module.exports = {
    ensureAuthenticated: function(require, res, next) {
        if(require.isAuthenticated()){
            return next();
        }
        require.flash('error_msg', 'Please log in to view this resource');
        res.redirect('/login');
    }
}