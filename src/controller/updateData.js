const { saveDirectoryTree, updatePapersFile } = require('../service/updateData')
const crypto = require('crypto')
const path = require('path')

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

// 更新文章
exports.webHookPapersFile = async (req, res) => {
  // console.log(req, 'webHookPapersFile',req.rawHeaders) //一大串仓库push的信息，用它来计算动态签名
  const header = []
  for(let i = 0; i < req.rawHeaders.length; i += 2){
    header.push({
      [req.rawHeaders[i]]: req.rawHeaders[i + 1]
    })
  }
  console.log('header',header)
  const sign = header['X-Hub-Signature']   //输出为：sha1=${secret的加密字符串}
  const event = header['X-GitHub-Event']    //输出为：事件名称(push)
  const commitID = header['X-GitHub-Delivery'] //输出为：commitID
  console.log(event)
  if(event=='push'){
    // 根据请求的body和secret计算sha1的值
    const hmac = crypto.createHmac('sha1','bilibili123456');
    console.log(hmac)
    // hmac.update(new Buffer(JSON.stringify(req.body))); //req.body时github传过来的post数据(跟request.body一样的)
    const signature = 'sha1=' + hmac.digest('hex'); //用这个跟sign对比
    // 可在此验证sign真伪
    // if(signature == sign){
    //   let cwd = process.cwd()
    //   runCmd('sh', [path.join(cwd,'scripts/pullClover.sh')], function(res){
    //     console.log(res) //res返回的是shell命令操作后在命令行终端显示的字符串，这里是一些git操作的提示
    //     saveDirectoryTree()
    //   });
    // }
  }
  res.send({
    errno: 0,
    msg: 'hello world'
  })
  // body = { message:'hello, github' }
}

// 运行shell
function runCmd(cmd, args, callback) {
  const spawn = require('child_process').spawn;
  const child = spawn(cmd, args);
  const res = "";

  child.stdout.on('data', function(buffer) { res += buffer.toString(); });
  child.stdout.on('end', function() { callback (res) });
}