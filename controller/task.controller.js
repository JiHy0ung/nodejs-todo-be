const Task = require("../model/Task");

// 기능 정의
const taskController = {};

// 할 일 생성
taskController.createTask = async (req, res) => {
  try {
    // req.body에서 task와 isComplete값을 읽어옴
    console.log("Received body:", req.body);

    const { task, contents, isComplete } = req.body;

    // 모델을 불러와 req.body에서 받아온 task와 isComplete 값을 넣어 newTask 생성
    const newTask = new Task({ task, contents, isComplete });

    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "failed", error: err.message });
  }
};

// 할 일 조회
taskController.getTask = async (req, res) => {
  try {
    // Task 모델에서 taskList를 가져옴.(전체)
    // __v(버전 정보)를 빼고 보여줘라
    const taskList = await Task.find({}).select("-__v");

    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "failed", error: err.message });
  }
};

// 할 일 수정
taskController.updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      // req.body에 스키마 검증 적용.
      new: true, // 수정 후의 task가 반환
      // mongoose의 update 계열 함수에서는 스키마 유효성 검사를 하지 않음.
      // 그래서 runValidators: true를 하게되면
      // 스키마에 설정된 required, minLength, enum 등의 유효성 검사를 적용함.
      // required를 설정해두었기 때문에 빈문자열이나 null이 들어오는 걸 막아줌.
      runValidators: true,
    });
    // 해당 아이디의 데이터가 존재하지 않을 경우
    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ status: "ok", data: updateTask });
  } catch (err) {
    res.status(400).json({ status: "failed", error: err.message });
  }
};

// 할 일 삭제
taskController.deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ status: "ok", data: deleteTask });
  } catch (err) {
    res.status(400).json({ status: "failed", error: err.message });
  }
};

module.exports = taskController;
