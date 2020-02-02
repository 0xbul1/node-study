// var http = require('http');
// var fs = require('fs');
// var template = require('art-template');
// var url = require('url');

// var comments = [
//   {
//     name: '张三',
//     message: '我很快乐',
//     dataTime: '2015-05-15',
//   },
//   {
//     name: '11',
//     message: '我很快乐',
//     dataTime: '2015-05-15',
//   },
//   {
//     name: '22',
//     message: '我很快乐',
//     dataTime: '2015-05-15',
//   },
//   {
//     name: '33',
//     message: '我很快乐',
//     dataTime: '2015-05-15',
//   },
//   {
//     name: '44',
//     message: '我很快乐',
//     dataTime: '2015-05-15',
//   },
// ];

// http
//   .createServer(function(req, res) {
//     var parseObj = url.parse(req.url, true);
//     var pathname = parseObj.pathname;
//     if (pathname === '/') {
//       fs.readFile('./views/index.html', function(err, data) {
//         if (err) {
//           return res.end('404 not found');
//         }
//         var htmlStr = template.render(data.toString(), {
//           comments: comments,
//         });
//         res.end(htmlStr);
//       });
//     } else if (pathname.indexOf('/public/') === 0) {
//       fs.readFile('.' + pathname, function(err, data) {
//         if (err) {
//           return res.end('404 not found');
//         }
//         res.end(data);
//       });
//     } else if (pathname === '/post') {
//       fs.readFile('./views/post.html', function(err, data) {
//         if (err) return res.end('404 not found');
//         res.end(data);
//       });
//     } else if (pathname === '/pinglun') {
//       // res.end(JSON.stringify(parseObj.query));
//       var comment = parseObj.query;
//       comment.dateTime = '2017-12-12';
//       comments.unshift(comment);
//       res.statusCode = 302;
//       res.setHeader('Location', '/');
//       res.end();
//     } else {
//       fs.readFile('./views/404.html', function(err, data) {
//         if (err) return res.end('404 not found');
//         res.end(data);
//       });
//     }
//   })
//   .listen(3000, function() {
//     console.log('3000-port running');
//   });
var express = require('express');
var app = express();

var comments = [
  {
    name: '张三',
    message: '我很快乐',
    dataTime: '2015-05-15',
  },
  {
    name: '11',
    message: '我很快乐',
    dataTime: '2015-05-15',
  },
  {
    name: '22',
    message: '我很快乐',
    dataTime: '2015-05-15',
  },
  {
    name: '33',
    message: '我很快乐',
    dataTime: '2015-05-15',
  },
  {
    name: '44',
    message: '我很快乐',
    dataTime: '2015-05-15',
  },
];

app.use('/public/', express.static('./public/'));
app.engine('html', require('express-art-template'));

app.get('/', function(req, res) {
  // res.send('这里是根目录');
  res.render('index.html', {
    comments: comments,
  });
});

app.get('/post', function(req, res) {
  res.render('post.html');
});
app.get('/pinglun', function(req, res) {
  // console.log(req.query);
  var comment = req.query;
  comment.dateTime = '2015-1-15';
  comments.unshift(comment);
  // res.statusCode = 302;
  // res.setHeader('Location', '/');
  res.redirect('/');
});

app.listen(3001, function() {
  console.log('running');
});
