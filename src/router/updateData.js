/**
 * 路由模块中，只存放客户端的请求与处理函数之间的映射关系
 */

const express = require('express')
const updateDataHandler = require('../controller/updateData')

const router = express.Router()

// 更新目录树
router.get('/updateDirectoryTree', updateDataHandler.updateDirectoryTree)

module.exports = router
