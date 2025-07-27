const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cors = require("cors");
require("dotenv").config();

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

const app = express();

// cors 문제를 해결하기 위해 npm cors 사용.
// 위치 중요함.
// 라우터 밑에 있으면 안됨. 여전히 에러 생김.
app.use(cors());

// request body를 객체 형태롤 받기 위해서 body-parser 사용
// http request에 있는 payload값을 req.body에 넣어줌.
app.use(bodyParser.json());

// "/api" 주소를 넣는게 필수적인 것은 아니지만
// api 호출이라는걸 명시하기 위해서 넣어줌.
app.use("/api", indexRouter);

const port = 5555;

const mongoURI = MONGODB_URI_PROD;

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
app.listen(process.env.PORT || port, () => {
  console.log(`server on`);
});

/*
  1. 회원가입
    유저가 이메일, 패스워드, 유저이름 등을 입력해서 보냄
    받은 정보를 저장함(데이터베이스 모델 필요)
    비밀번호 암호화 시켜서 저장(라이브러리 사용)
      1. 라우터 지정 (user.api.js)
      2. 유저 모델 생성
      3. 데이터 저장(기존 가입 유저 확인, 비밀번호 암호화)
      4. 응답 보내기

  2. 로그인
    유저가 이메일과 비밀번호를 입력
    데이터 베이스에서 해당 이메일과 비밀번호를 가진 유저가 있는지 확인
    없으면 로그인 실패
    있다면 로그인 성공 + JWT 토큰(유저정보, 유효기간)
    프론트엔드에서 이 정보를 저장
      1. 라우터 설정 (user.api.js)
      2. 이메일,비밀번호 정보 읽어오기
      3. 이메일을 가지고 유저정보 가져오기
      4. 해당 유저에 DB에 있는 비밀번호와 프론트엔드에서 보낸 비밀번호와의 일치 여부 확인
      5. 맞다면 토큰 발행 / 아니라면 에러 메세지
      6. 응답으로 유저 정보 + 토큰

*/
