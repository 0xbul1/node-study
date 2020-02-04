var express = require('express');
var app = express();
var router = require('./router');
var bodyParser = require('body-parser');
// var fs = require('fs');

// express static filesnode_modules
app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));
// 配置模版引擎和body-parser，要在挂载路由之前
// 使用模版引擎
app.engine('html', require('express-art-template'));

// 配置body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// 第二种方法的配合
// router(app);

//第三种方法配合！
// 把路由容器挂载到app 服务中
app.use(router);

app.listen(3000, function() {
  console.log('3000 port running');
});
