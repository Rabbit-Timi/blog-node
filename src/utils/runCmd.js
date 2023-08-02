// 运行shell
exports.runCmd = (cmd, args, callback) => {
  const spawn = require('child_process').spawn
  const child = spawn(cmd, args)
  let res = ''

  child.stdout.on('data', function (buffer) {
    res += buffer.toString()
  })
  child.stdout.on('end', function () {
    callback(res)
  })
}
