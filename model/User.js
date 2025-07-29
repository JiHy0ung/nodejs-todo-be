const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); // JWT 토큰 발행을 위한 라이브러리

require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// mongoose의 methods를 통해서 jwt 토큰 발행
// expiresIn 옵션을 통해 토큰 만료 기간 설정 가능.
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "3d",
  });
  return token;
};

// 백엔드에서 프로트엔드에서 데이터를 보낼때 항상 비밀번호를 제외하고 보여주기 위함.
// controller에서 -[지울 필드]로 제외하는 것은 그때만, 여기서 제외한 것은 항상
// mongoose의 toJSON을 통해 객체를 json형태로 변환(프론트엔드로 보내기 위해)
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.updatedAt;
  delete obj.createdAt;
  delete obj.__v;
  return obj;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
