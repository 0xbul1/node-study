// 数据操作文件模块
// 职责：操作文件中的数据，只处理数据，不关心业务
var fs = require('fs');
var dbPath = './db.json';
// 获取学生列表;
function find(callback) {
  fs.readFile(dbPath, 'utf-8', function(err, data) {
    if (err) return callback(err);
    callback(null, JSON.parse(data).students);
  });
}

// 添加保存学生;
// function save() {}

// 更新学生;
// function update() {}

// 删除学生
// function delete() {}

module.exports = {
  find,
};
