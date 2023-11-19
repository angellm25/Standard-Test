const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// This function will be called whenever the server needs to authenticate a user
module.exports = function (passport) {
 passport.use(new LocalStrategy(
    function (username, password, done) {
      // Replace this with your actual database logic
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
 ));

 passport.serializeUser(function (user, done) {
    done(null, user.id);
 });

 passport.deserializeUser(function (id, done) {
    // Replace this with your actual database logic
    User.findById(id, function (err, user) {
      done(err, user);
    });
 });
};



function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login');
}