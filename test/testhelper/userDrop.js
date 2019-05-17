const User = require('../../models/user');

module.exports = function(done) {
  if (process.env.NODE_ENV === 'test') {
    User
      .deleteMany({
          _id:{
              $nin: ["5cde642793a4c63b94675355" ]
          }
      })
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.log(err);
        done(err)
      });
  }
};