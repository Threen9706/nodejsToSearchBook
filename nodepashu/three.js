var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var http = require('http');
var mongoose = require('mongoose');
var cors = require('cors')
//纯Javascript转换编码的模块 iconv-lite
var iconv = require('iconv-lite');
//当前为mongon的表结构实例对象
var BookModel = require('./bookModel');
var querystring = require('querystring');
var url = require("url");
//创建一个数据库连接
mongoose.connect('mongodb://localhost/book');
var url1 = 'http://www.aliwx.com.cn/cover?bid='
app.use(cors())
app.get('/searchBook', function (req, res) {
  request(`${url1}${req.query.id}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var bookInfo = {
        title: $('.bname').text(),
        author: $('.bauthor').text(),
        bookDesc: $('.bookDesc').text(),
        src: $('.cover').attr('src'),
        url2: $('user-orther.ul.li.a').attr('href'),
        class: $('body > div > div.infoarea > div > ul.lastchapter.clear > li:nth-child(1)').text(),
        bStatus: $('body > div > div.infoarea > div > ul.lastchapter.clear > li:nth-child(3)').text(),
        lastUpdate: $('.lastchapter.clear li:nth-child(4)').text(),
      };
      BookModel.create(bookInfo, function (err, data) {
        if (err) {
          console.log(err);
        }
        res.send(data);
      });
    };
  });

});


app.get('/list', function (req, res, next) {

  BookModel.find({}, function (err, data) {
    console.log(data)
    if (err) console.log(err);

    res.send(data);
  });
});


app.get('/bInfo', function (req, res, next) {

  var arg = url.parse(req.url).query;
  //将arg参数字符串反序列化为一个对象
  var params = querystring.parse(arg);
  console.log(params.id);
  BookModel.findById(params.id, function (err, data) {
    if (err) console.log(err);

    if (data) {
      res.send(data);
    };
  });

  // BookModel.findById
});


app.get('/chapter',function (req, res, next) {

  var arg = url.parse(req.url).query;
  //将arg参数字符串反序列化为一个对象
  var params = querystring.parse(arg);
  console.log(params.id);
  BookModel.findById(params.id, function (err, data) {
    if (err) console.log(err);

    if (data) {
      res.send(data);
    };
  });

});
var server = app.listen(3000, function () {
  console.log('listening at 3000');
});