const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");

router.post("/", taskController.createTask);

router.get("/", taskController.getTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

// 설정한 라우터 내보내기
module.exports = router;
