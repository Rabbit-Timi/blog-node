const { saveDirectoryTree } = require('../service/updateData')

// 更新存储目录树
exports.updateDirectoryTree = async (req, res) => {
  await saveDirectoryTree().then(function (data) {
    res.send({
      errno: 0,
      msg: data.msg
    })
  }).catch(function (err) {
    res.send({
      errno: err.errno,
      msg: '更新失败',
    })
  })
}