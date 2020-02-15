const { User } = require('./models');

const express = require('express');

const app = express();
app.use(express.json());

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});
app.post('/api/register', async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
  });

  res.send(user);
});
app.post('/api/login', async (req, res) => {
  // 先看用户存不存在，在看密码对不对
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) {
    // 422 用户客户端提交数据有问题
    return res.status(422).send({
      message: '用户名不存在',
    });
  }

  // bcrypt解密 返回true或者false
  const isPasswodrValid = require('bcrypt').compareSync(
    req.body.password,
    user.password,
  );
  if (!isPasswodrValid) {
    return res.status(422).send({
      message: '密码无效',
    });
  }

  //生成token
  // 一般不用session了;
  // session有状态，用这个浏览器换个浏览器关掉浏览器session就失效;
  // restful 偏向于无状态链接 一般用jwt作为用户登录的凭据
  const jwt = require('jsonwebtoken');
  // 生成token只是为了告诉服务端，刚才签发的token在数据库对应的哪个用户，所以最简单只需要用户id
  const SECRET = 'qwertyuiop';
  const token = jwt.sign(
    {
      id: String(user._id),
    },
    SECRET, // 密钥
  );
  res.send({
    user,
    token: token,
  });
});
// 中间件
const authMiddleware = async (req, res, next) => {
  const jwt = require('jsonwebtoken');
  // 生成token只是为了告诉服务端，刚才签发的token在数据库对应的哪个用户，所以最简单只需要用户id
  const SECRET = 'qwertyuiop';
  const raw = String(req.headers.authorization)
    .split(' ')
    .pop();
  const { id } = jwt.verify(raw, SECRET);
  req.user = await User.findById(id);
  next();
};

app.get('/api/profile', authMiddleware, async (req, res) => {
  // const jwt = require('jsonwebtoken');
  // // 生成token只是为了告诉服务端，刚才签发的token在数据库对应的哪个用户，所以最简单只需要用户id
  // const SECRET = 'qwertyuiop';
  // const raw = String(req.headers.authorization)
  //   .split(' ')
  //   .pop();
  // const { id } = jwt.verify(raw, SECRET);
  // const user = await User.findById(id);
  res.send(req.user);
});

app.listen(3000, () => {
  console.log('http://localhost:3000/');
});
