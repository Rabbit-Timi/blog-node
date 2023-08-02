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
  try {
    fs.accessSync(DIRECTORY_PATH, fs.constants.F_OK)
    let data = fs.readFileSync(DIRECTORY_PATH, 'utf-8')
    data = JSON.parse(data)
    if (data) {
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (res[i].type === '.md' && res[i].filePath === data[j].filePath) {
            res[i].hitsCount = res[i].hitsCount + data[j].hitsCount
          }
        }
      }
    }
    console.log('can access')
  } catch (err) {
    console.error('no access!')
  }
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
