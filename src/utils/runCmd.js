// 运行shell
exports.runCmd = (cmd, callback, args = []) => {
  const spawn = require('child_process').spawn
  let child
  if (args) {
    child = spawn(cmd, args)
  } else {
    child = spawn(cmd)
  }

  let res = ''

  child.stdout.on('data', function (buffer) {
    res += buffer.toString()
  })
  child.stdout.on('end', function () {
    callback(res)
  })
}
