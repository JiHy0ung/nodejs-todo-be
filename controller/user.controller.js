const User = require("../model/User");
// const bcrypt = require("bcrypt"); // 비밀번호 암호화를 위한 라이브러리지만 c++로 만들어져 c++를 이해할 수 있는 서버단에서만 동작이 가능하여 브라우저에서는 동작을 안함
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 가입 여부 확인
    // {email: email} = {email}
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 가입된 이메일입니다.");
    } else {
      // 비밀번호 암호화
      // bcrypt 암호화 라이브러리
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(password, salt);
      // console.log("hashPassword:", hashPassword);

      const newUser = new User({ name, email, password: hashPassword });
      await newUser.save();

      res.status(200).json({ status: "Register Success" });
    }
  } catch (err) {
    res.status(400).json({ status: "Register Failed", err: err.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }, " -__v -createdAt -updatedAt");
    if (user) {
      // 라이브러리로 유저가 입력한 비밀번호와 암호화된 비밀번호를 비교.
      if (bcrypt.compareSync(password, user.password)) {
        //토큰 발행
        const token = user.generateToken();
        return res.status(200).json({ status: "Login Success", user, token });
      } else {
        if (password.trim() === "") {
          throw new Error("비밀번호를 입력해주세요.");
        }
        throw new Error("틀린 비밀번호입니다.");
      }
    } else {
      if (email.trim() === "") {
        throw new Error("이메일을 입력해주세요.");
      }
      throw new Error("가입되지 않은 이메일 정보입니다.");
    }
  } catch (err) {
    res.status(400).json({ status: "Login Failed", err: err.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const id = req.userId; // {userId} = req
    const user = await User.findById(id);
    if (!user) {
      throw new Error("can not find user");
    }
    res.status(200).json({ status: "Find User Success", user });
  } catch (err) {
    res.status(400).json({ status: "Get User Failed", err: err.message });
  }
};

module.exports = userController;
