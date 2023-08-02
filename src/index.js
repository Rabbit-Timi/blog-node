const express = require('express')
const cors = require('cors') // 将 cors 注册为全局中间件
const fileRouter = require('./router/file')
const updateData = require('./router/updateData')
const { PAPERS_ILLUSTRATION_PATH, LOGO_PATH } = require('./constant/index.js')
const { BASEURL } = require('./app/config.js')
const { runCmd } = require('./utils/runCmd')
const path = require('path')
const { saveDirectoryTree } = require('./service/updateData')

const app = express()

app.use(express.urlencoded({ extended: false }))
// 解析post请求application/json,格式
app.use(express.json())

// 路由请求超时的中间件
// app.use(function (req, res, next) {
//     // 这里必须是Response响应的定时器
//     res.setTimeout(5000, function () {
//         console.log("Request has timed out.")
//         return res.status(408).send("请求超时")
//     })
//     next()
// })

// 解决跨域
app.use(cors())

app.use('/api', fileRouter)
app.use(updateData)

app.use('/illustration', express.static(PAPERS_ILLUSTRATION_PATH))

app.use('/Logo', express.static(LOGO_PATH))

function GitClone() {
  let cwd = process.cwd()
  const shPath = path.join(cwd, 'scripts/clone.sh')
  runCmd('sh', [shPath], function () {
    saveDirectoryTree()
    console.log('end execute')
  })
}
GitClone()

const server = app.listen(8888, () => {
  console.log(BASEURL)
})
server.timeout = 50000
