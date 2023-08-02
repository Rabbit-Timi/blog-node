const { saveDirectoryTree } = require('../service/updateData')
const { GIT_WEBHOOK_TOKEN } = require('../constant/index')
const { runCmd } = require('../utils/runCmd')
const crypto = require('crypto')
const path = require('path')

// 更新存储目录树
exports.updateDirectoryTree = async (req, res) => {
  await saveDirectoryTree()
    .then(function (data) {
      res.send({
        errno: 0,
        msg: data.msg,
      })
    })
    .catch(function (err) {
      res.send({
        errno: err.errno,
        msg: '更新失败',
      })
    })
}

// 更新文章
exports.webHookPapersFile = async (req, res) => {
  // console.log(req.headers, req.get('X-Hub-Signature'))
  const sign = req.get('X-Hub-Signature') //输出为：sha1=${secret的加密字符串}
  const event = req.get('X-GitHub-Event') //输出为：事件名称(push)
  if (event === 'push') {
    // 根据请求的body和secret计算sha1的值
    const hmac = crypto.createHmac('sha1', GIT_WEBHOOK_TOKEN)
    hmac.update(JSON.stringify(req.body)) //req.body时github传过来的post数据(跟request.body一样的)
    const signature = 'sha1=' + hmac.digest('hex') //用这个跟sign对比
    // 可在此验证sign真伪
    if (signature === sign) {
      let cwd = process.cwd()
      const shPath = path.join(cwd, 'scripts/pull.sh')
      runCmd('sh', [shPath], function (res) {
        console.log(res) //res返回的是shell命令操作后在命令行终端显示的字符串，这里是一些git操作的提示
        saveDirectoryTree()
      })
    }
  }
  res.send({
    errno: 0,
    msg: '更新成功',
  })
  // body = { message:'hello, github' }
}
