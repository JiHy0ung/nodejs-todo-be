const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const app = express();

// request body를 객체 형태롤 받기 위해서 body-parser 사용
// http request에 있는 payload값을 req.body에 넣어줌.
app.use(bodyParser.json());

// "/api" 주소를 넣는게 필수적인 것은 아니지만
// api 호출이라는걸 명시하기 위해서 넣어줌.
app.use("/api", indexRouter);

const port = 5555;

const mongoURI = `mongodb://localhost:27017/node-todo`;

// useNewUrlParser - 옛날 형식 뿐만 아니라 요즘 형식도 잘 사용할 수 있도록
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.error("DB connection Failed.", err);
  });

// app 리스너 세팅
app.listen(port, () => {
  console.log(`server on ${port}`);
});
