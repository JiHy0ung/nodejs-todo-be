// express에서 제공하는 route 사용
const express = require("express");
const router = express.Router();

const taskApi = require("./task.api");

// /tasks라는 주소로 호출되면 taskApi 사용
router.use("/tasks", taskApi);

module.exports = router;
