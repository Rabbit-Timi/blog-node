const fs = require('fs')
// const path = require('path')
const { PAPERS_PATH, DIRECTORY_PATH } = require('../constant/index.js')
const { DFSDir } = require('../utils/generateDirectory.js')
// require('../data/directory.json')

// 存储更新目录树
function saveDirectoryTree() {
  const dir = []
  const res = []
  DFSDir(dir, PAPERS_PATH, res)
  // console.log(dir)
  return new Promise(function (resolve, reject) {
    fs.writeFile(DIRECTORY_PATH, JSON.stringify(res), function (err) {
      // console.log(err)
      if (err) {
        reject(err)
      } else {
        resolve({ msg: '更新成功' })
      }
    })
  })
}

module.exports = {
  saveDirectoryTree,
}
