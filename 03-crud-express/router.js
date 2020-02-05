// | 请求方法 | 请求路径         | get 参数 | post 参数                      | 备注             |
// | -------- | ---------------- | -------- | ------------------------------ | ---------------- |
// | GET      | /studens         |          |                                | 渲染首页         |
// | GET      | /students/new    |          |                                | 渲染添加学生页面 |
// | POST     | /studens/new     |          | name、age、gender、hobbies     | 处理添加学生请求 |
// | GET      | /students/edit   | id       |                                | 渲染编辑页面     |
// | POST     | /studens/edit    |          | id、name、age、gender、hobbies | 处理编辑请求     |
// | GET      | /students/delete | id       |                                | 处理删除请求     |
// |          |                  |          |                                |                  |

// 方法1:直接导出app，引入router但是这样就会导致router变成了入口函数
// 这里是方法二 将router。js导出，然后引用，但是这样也不好，因为express提供了更好的方式包装路由
// var fs = require('fs');
// module.exports = function(app) {
//   app.get('/students', function(req, res) {
//     // 这个utf-8相当于data.toString
//     fs.readFile('./db.json', 'utf-8', function(err, data) {
//       if (err) return res.status(500).send('Server error');
//       // 文件中读取的是字符串，要专转成对象
//       var students = JSON.parse(data).students;
//       // res.send('hello curd');
//       res.render('index.html', {
//         labels: ['🤪', '🎃', '🙀', '🐼'],
//         students: students,
//       });
//     });
//   });
//   app.get('/students/new', function(req, res) {});
//   app.get('/students/new', function(req, res) {});
//   app.get('/students/new', function(req, res) {});
//   app.get('/students/new', function(req, res) {});
//   app.get('/students/new', function(req, res) {});
// };

// 方法3
// express 提供了一种更好的方式专门来包装路由
var fs = require('fs');
var Student = require('./student');

var express = require('express');
// 1，包装一个路由容器
var router = express.Router();
// 2, 把路由挂载到路由容器
router.get('/students', function(req, res) {
  // 这个utf-8相当于data.toString
  // fs.readFile('./db.json', 'utf-8', function(err, data) {
  //   if (err) return res.status(500).send('Server error');
  //   // 文件中读取的是字符串，要专转成对象
  //   var students = JSON.parse(data).students;
  //   // res.send('hello curd');
  //   res.render('index.html', {
  //     labels: ['🤪', '🎃', '🙀', '🐼'],
  //     students: students,
  //   });
  // });
  Student.find(function(err, students) {
    if (err) return res.status(500).send('Server error');
    // 文件中读取的是字符串，要专转成对象
    // var students = JSON.parse(students).students;
    // res.send('hello curd');
    res.render('index.html', {
      labels: ['🤪', '🎃', '🙀', '🐼'],
      students: students,
    });
  });
});

router.get('/students/new', function(req, res) {
  res.render('new.html');
});
router.post('/students/new', function(req, res) {
  // 获取表单数据
  // 处理 (数据保存到db.json文件持久化)
  // 先读取转成对象，往对象中push，把对象转成字符串，把字符串再次写入文件
  // 响应
  console.log(req.body);
});
router.get('/students/edit', function(req, res) {});
router.post('/students/edit', function(req, res) {});
router.get('/students/delete', function(req, res) {});

// 把 router导出
module.exports = router;
