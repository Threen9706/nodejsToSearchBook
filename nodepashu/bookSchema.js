'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var bookSchema = new mongoose.Schema({
    id: { type: String, comment: "" },
    title: { type: String, required: true, comment: "书名，添加姓名非空约束" },
    author: { type: String, comment: "" },
    src: { type: String, comment: "图片地址" },
    content: { type: String, comment: "内容" },
    class: { type: String, comment: "分类" },
    bookDesc: { type: String, comment: "简介" },
    bStatus: { type: String, comment: "书籍状态" },
    lastUpdate: { type: String, comment: "更新时间" },
    created: { type: Date, default: Date.now() },
});

module.exports = bookSchema;