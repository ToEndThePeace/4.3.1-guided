const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router");
const requiresAuth = require("../auth/requires-auth");
const dbConnection = require("../database/connection");

const server = express();

// This would be external
const sessionConfig = {
  name: "monster",
  secret: process.env.SESSION_SECRET || "keep it secret, keept it safe!",
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 minutes in ms
    secure: process.env.COOKIE_SECURE || false, // true means use ONLY over HTTPS - true in production, false in development
    httpOnly: true, // JS code on client CANNOT access session cookie - ALWAYS TRUE
  },
  resave: false,
  saveUninitialized: true, // GDPR Compliance - READ DOCS!
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 6000, // DELETE EXPIRED SESSIONS EVERY 6000 MS
  }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", requiresAuth, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
