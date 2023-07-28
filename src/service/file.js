const fs = require('fs')
const { PAPERS_PATH, DIRECTORY_PATH } = require('../constant/index.js')
const { BASEURL } = require('../app/config.js')

// 读取目录树
function getSideDirectory() {
  return new Promise(function (resolve, reject) {
    fs.readFile(DIRECTORY_PATH, function (err, data) {
      if (err) {
        reject(err)
      } else {
        const res = []
        data = JSON.parse(data)
        data.forEach(elem => {
          const pathArray = elem.filePath.split('/').filter(a => a != '')
          // console.log(pathArray)
          if (pathArray.length === 1 && elem.type === 'directory') res.push(elem)
        })
        resolve(res)
      }
    })
  })
}

// 图片路径修改
function modifyImgPath(data) {
  let dataStrRexArr
  const tempArray = []
  // 匹配图片地址
  const repeatRegex = /!\[(\w+)\]\(([^()]+)\)/g

  while ((dataStrRexArr = repeatRegex.exec(data))) {
    tempArray.push({
      oldStr: dataStrRexArr[0],
      str: `![${dataStrRexArr[1]}](${BASEURL}/${dataStrRexArr[2]})`,
      index: dataStrRexArr.index,
    })
  }

  for (let i = 0; i < tempArray.length; i++) {
    const { oldStr, str } = tempArray[i]
    data = data.replace(oldStr, str)
  }

  return data
}

// 读取文件内容
function getFileContent(fileName) {
  const url = `${PAPERS_PATH}${fileName}`

  // console.log(url)
  return new Promise(function (resolve, reject) {
    fs.readFile(url, function (err, data) {
      if (err) {
        reject(err)
      } else {
        data = data.toString()
        data = modifyImgPath(data)
        // console.log('test_service')
        resolve(data)
      }
    })
  })
}

// 读取Tags

function getTagsByPath(path) {
  const pathArray = path.split('/').filter(a => a != '')
  return new Promise(function (resolve, reject) {
    fs.readFile(DIRECTORY_PATH, function (err, data) {
      data = JSON.parse(data)
      if (err) {
        reject(err)
      } else {
        const tagDir = []

        data.forEach(d => {
          const dFilePathArray = d.filePath.split('/').filter(a => a != '')
          if (
            path &&
            d.filePath.startsWith(path) &&
            d.type === 'directory' &&
            dFilePathArray.length - 1 === pathArray.length
          ) {
            tagDir.push(d)
          }
        })
        resolve(tagDir)
      }
    })
  })
}

// 读取文件列表
function getFileListByPath(path = '') {
  // console.log(path)
  return new Promise(function (resolve, reject) {
    fs.readFile(DIRECTORY_PATH, function (err, data) {
      data = JSON.parse(data)
      if (err) {
        reject(err)
      } else {
        let fileList = []

        data.forEach(d => {
          if (d.filePath.startsWith(path) && d.type === '.md') {
            fileList.push(d)
          }
        })

        resolve({ fileList, total: fileList.length })
      }
    })
  })
}

// 浏览量
function addFilePageHits(path) {
  // console.log('path:', path)
  // const cwd = process.cwd()
  // console.log('cwd:',cwd)
  return new Promise(function (resolve, reject) {
    // console.time('read')
    let data = fs.readFileSync(DIRECTORY_PATH)
    // console.timeEnd('read')
    if (data) {
      data = JSON.parse(data)
      for (let i = 0; i < data.length; i++) {
        if (data[i].filePath === path) {
          data[i].hitsCount++
          break
        }
      }
    }
    // console.time('write')
    fs.writeFile(DIRECTORY_PATH, JSON.stringify(data), function (err) {
      // console.log(err)
      if (err) {
        reject(err)
        // console.timeEnd('write')
      } else {
        // console.timeEnd('write')
        resolve({ msg: '更新成功' })
      }
    })
  })
}

module.exports = {
  getSideDirectory,
  getFileContent,
  getTagsByPath,
  getFileListByPath,
  addFilePageHits,
}
