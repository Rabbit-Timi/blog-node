/**
 * 路由模块中，只存放客户端的请求与处理函数之间的映射关系
 */

const express = require('express')
const fileHandler = require('../controller/file')

const router = express.Router()

// 获取全部文件目录
router.get('/file/getSideDirectory', fileHandler.getSideDirectory)

// 获取单个md文件内容
router.get('/file/getFile', fileHandler.getFile)

// 获取tags
router.get('/file/getTags', fileHandler.getTags)

// 获取文件列表
router.get('/file/getFileList', fileHandler.getFileList)

// 文章浏览量增加
router.post('/file/hits', fileHandler.AddHits)

module.exports = router
