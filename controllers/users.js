const bcrypt = require("bcrypt");
var User = require('../models/users');

const saltRounds = 10;

var UsersController = {
  Index: function(req, res) {
    User.find(function(err, users) {
      if (err) { throw err; }
      console.log(users);
      res.json({users: users});
    });
  },
    Create: async function(req, res) {
      const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
      const hashedEmail = await bcrypt.hash(req.body.email, saltRounds);
      var user = new User({
        name: req.body.name,
        password: hashedPwd,
        email: hashedEmail,
        posts: req.body.posts
      });
      user.save(function(err) {
        if (err) { throw err; }

        res.status(201).redirect('/users');
      });
    },
    Login: async function(req, res){
      try {
    const user = await User.findOne({ name: req.body.name });
    console.log(user);
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        //sess = req.session;
      //  sess.email = req.body.email;
      //  console.log(sess.email);
        //   ..... further code to maintain authentication like jwt or sessions
        res.json(user)
      } else {
        res.send("Wrong username or password.");
      }
    } else {
      res.send("Wrong username or password.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
    }
};

module.exports = UsersController;
