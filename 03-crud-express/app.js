var express = require('express');
var app = express();
var fs = require('fs');

// express static filesnode_modules
app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));

// 使用模版引擎
app.engine('html', require('express-art-template'));
app.get('/', function(req, res) {
  // 这个utf-8相当于data.toString
  fs.readFile('./db.json', 'utf-8', function(err, data) {
    if (err) return res.status(500).send('Server error');
    // 文件中读取的是字符串，要专转成对象
    var students = JSON.parse(data).students;
    // res.send('hello curd');
    res.render('index.html', {
      labels: ['🤪', '🎃', '🙀', '🐼'],
      students: students,
    });
  });
});

app.listen(3000, function() {
  console.log('3000 port running');
});
