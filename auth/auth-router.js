const bcryptjs = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  // validate body with middleware to ensure un/pass are there
  const { username, password } = req.body;

  // hash user password
  // change salt to higher number in production
  //as HIGH AS YOU CAN GO without terrible UX
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcryptjs.hashSync(password, rounds);

  Users.add({ username, password: hash })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.post("/login", (req, res) => {
  // validate body

  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        req.session.user = { id: user.id, username: user.username };
        res.json({ user, session: req.session });
      } else res.status(401).json({ message: "forbidden" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Could not log out." });
      } else {
        res.status(204).end();
      }
    });
  } else res.status(204).end();
});

module.exports = router;
