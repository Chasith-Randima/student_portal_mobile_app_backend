const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const userRouter = require("./routes/userRoute");
const examRotuer = require("./routes/examRoute");
const moduleRouter = require("./routes/moduleRoute");
const materialRouter = require("./routes/materialRoute");
const resultRouter = require("./routes/resultRoute");
const lectureRouter = require("./routes/lectureRoute");

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(cors());
app.options("*", cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.disable("etag");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/exams", examRotuer);
app.use("/api/v1/modules", moduleRouter);
app.use("/api/v1/materials", materialRouter);
app.use("/api/v1/results", resultRouter);
app.use("/api/v1/lectures", lectureRouter);

module.exports = app;
