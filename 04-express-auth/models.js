const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/express-auth', {
  useCreateIndex: true, //创建索引警告
  useUnifiedTopology: true, //默认警告
  useNewUrlParser: true, //警告
});
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    set(val) {
      // 加密用户的密码
      // return val // 默认
      return require('bcrypt').hashSync(val, 10);
    },
  },
});

const User = mongoose.model('User', UserSchema);

// User.db.dropCollection('users'); // 删掉数据库里的集合

module.exports = { User };
