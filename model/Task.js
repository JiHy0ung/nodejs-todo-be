const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// 할 일 스키마 작성
// timestamps 옵션을 추가하면 등록된 날짜 정보 표시됨.
const taskSchema = Schema(
  {
    task: { type: String, required: true },
    contents: { type: String },
    isComplete: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// 모델 생성
// taskSchema를 참고해서 모델을 생성함.
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
