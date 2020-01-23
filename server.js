const express = require("express"); // importing a CommonJS module
const hubsRouter = require("./hubs/hubs-router.js");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

// server.use(express.json());
// server.use(helmet());
// server.use(morgan("dev"));
// server.use(methodLogger);

// server.use(express.json(), helmet(), morgan("dev"), methodLogger);
const middleware = [express.json(), helmet(), morgan("dev"), methodLogger];
server.use(middleware);
server.use(addName);
// server.use("/api/hubs", lockout);
server.use(lockDivThree);

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res, next) => {
  const nameInsert = req.name ? ` ${req.name}` : "";
  // next();

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function methodLogger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}

function addName(req, res, next) {
  req.name = req.name || "Raza";
  next();
}

function lockout(req, res) {
  // do some validation ....
  // .. uh oh Batmaon
  res.status(403).json({ message: "api lockout!" });
}

function lockDivThree(req, res, next) {
  const currentDate = new Date();
  // if (currentDate.getSeconds() % 3 === 0) {
  //   res.status(403).json({ message: "Loced out cause div by 3" });
  // } else {
  //   next();
  // }

  currentDate.getSeconds() % 3 === 0
    ? res.status(403).json({ message: "Loced out cause div by 3" })
    : next();
}
module.exports = server;
