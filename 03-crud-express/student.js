// 数据操作文件模块
// 职责：操作文件中的数据，只处理数据，不关心业务
var fs = require('fs');
var dbPath = './db.json';
// 获取学生列表;
function find(callback) {
  // callback
  // 第一个参数是 err
  //  成功是 null
  //  错误是 错误对象
  // 第二个参数是 结果
  //  成功是数组
  //  错误是undefined

  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) return callback(err);
    callback(null, JSON.parse(data).students);
  });
}
// var find = function(callback) {
//   fs.readFile(dbPath, 'utf-8', function(err, data) {
//     if (err) return callback(err);
//     callback(null, JSON.parse(data).students);
//   });
// };
function findById(id, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) return callback(err);
    var students = JSON.parse(data).students;
    var tempData = students.find(function(item) {
      return item.id === parseInt(id);
    });
    callback(null, tempData);
  });
}

// 添加保存学生;
//  * @param  {Object}   student  学生对象
//  * @param  {Function} callback 回调函数
function save(student, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) return callback(err);
    var students = JSON.parse(data).students;
    // 处理id不唯一
    student.id = students[students.length - 1].id + 1;
    students.push(student);
    // 对象保存成字符串
    var fileData = JSON.stringify({
      students: students,
    });
    //
    // 字符串保存到文件
    fs.writeFile(dbPath, fileData, function(err) {
      if (err) return callback(err);
      callback(null);
    });
  });
}
// 这样用
// save({ name: 'xx', age: 18 }, function(err) {
//   if (err) {
//     console.log('保存失败');
//   } else {
//     console.log('保存成功');
//   }
// });

// 更新学生;
function updateById(student, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) return callback(err);
    var students = JSON.parse(data).students;
    student.id = parseInt(student.id);
    // 当某个遍历项符合item.id = student.id ，find会终止遍历，返回遍历项
    var changeStudent = students.find(function(item) {
      return item.id === student.id;
    });
    for (var key in student) {
      changeStudent[key] = student[key];
    }
    // 对象保存成字符串
    var fileData = JSON.stringify({
      students: students,
    });
    // 字符串保存到文件
    fs.writeFile(dbPath, fileData, function(err) {
      if (err) return callback(err);
      callback(null);
    });
  });
}

// updateById(
//   {
//     id: 1,
//     name: 'xx',
//     age: 11,
//   },
//   function(err) {},
// );

// 删除学生
// function delete() {}

module.exports = {
  find,
  findById,
  save,
  updateById,
};
