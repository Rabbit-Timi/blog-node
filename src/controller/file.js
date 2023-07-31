const md = require('../utils/handlerMDToHtml')
const {
  getSideDirectory,
  getFileContent,
  getTagsByPath,
  getFileListByPath,
  addFilePageHits,
} = require('../service/file.js')

// 获取文件目录
exports.getSideDirectory = async (req, res) => {
  await getSideDirectory()
    .then(function (data) {
      res.send({
        errno: 0,
        data: {
          dir: data,
        },
      })
    })
    .catch(function (err) {
      res.send({
        errno: err.errno,
        msg: '读取目录失败',
      })
    })
}

// 获取.md文件信息
exports.getFile = async (req, res) => {
  const filePath = req.query.filePath
  await getFileContent(filePath)
    .then(function (data) {
      const html = md.render(data)
      res.send({
        errno: 0,
        data: {
          html: html,
        },
      })
    })
    .catch(function (err) {
      res.send({
        errno: err.errno,
        msg: '文件缺失',
      })
    })
}

// 读取Tags
exports.getTags = async (req, res) => {
  const tag_path = req.query.path
  await getTagsByPath(tag_path)
    .then(function (data) {
      res.send({
        errno: 0,
        data: {
          tagDir: data,
        },
      })
    })
    .catch(function (err) {
      res.send({
        errno: err.errno,
        msg: '文件缺失',
      })
    })
}

// 读取文件列表
exports.getFileList = async (req, res) => {
  const fileList_path = req.query.path
  const pageSize = req.query.pageSize
  const pageNum = req.query.pageNum
  await getFileListByPath(fileList_path)
    .then(function (data) {
      const { fileList, total } = data
      const start = pageSize * (pageNum - 1)
      const end = pageSize * pageNum
      const list = fileList.slice(start, end)
      res.send({
        errno: 0,
        data: {
          fileList: list,
          total,
        },
      })
    })
    .catch(function (err) {
      res.send({
        errno: err.errno,
        msg: '文件缺失',
      })
    })
}

// 浏览量
exports.AddHits = async (req, res) => {
  console.log(req.body)
  const path = req.body.path
  await addFilePageHits(path)
    .then(function (data) {
      res.send({
        errno: 0,
        data: {
          ...data,
        },
      })
    })
    .catch(function (err) {
      res.send({
        errno: err.errno,
        msg: '更新失败',
      })
    })
}

// 获取插图
// exports.getFileIllustration = (req, res) => {
//   const fileName = req.params.fileName
//   const imgName = req.params.imgName
//   const url = `${PAPERS_PATH}/${fileName}/${imgName}`
//   res.setHeader("Content-Type", CONTENT_TYPE);
//   fs.readFile(url, 'binary', function(err, dataStr){
//     if(err){
//       res.send({
//         errno: err.errno,
//         msg: '图片缺失'
//       })
//     } else {
//       res.send({
//         errno: 0,
//         data: {
//           fileName,
//           imgName,
//           src: dataStr,
//         }
//       })
//     }
//   })
// }
