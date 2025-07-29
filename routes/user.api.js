const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

// 1. 회원가입 endpoint
router.post("/", userController.createUser);

// 2. 로그인 endpoint
router.post("/login", userController.loginWithEmail);

// 3. 토큰으로 유저 id 빼내고 => 그 아이디로 유저 객체 찾아서 보내기
// 여러개의 함수가 들어갈 수 있음. next()함수를 이용하여 다음 함수를 호출.
router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
