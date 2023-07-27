/**
 * 路由模块中，只存放客户端的请求与处理函数之间的映射关系
 */

const express = require('express')
const updateDataHandler = require('../controller/updateData')

const router = express.Router()

// 更新目录树
router.get('/updateDirectoryTree', updateDataHandler.updateDirectoryTree)

// 从github更新文章
// router.post('/webhook', updateDataHandler.webHookPapersFile)
router.post('/webhook', function (ctx, next) { // 这里的/url必须与配置Webhooks时填写的接口路径相同
  console.log(ctx)
})

module.exports = router
