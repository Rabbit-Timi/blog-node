const fs = require('fs')
const path =require('path')
const {PAPERS_PATH, PAPERS_ILLUSTRATION_PATH} = require('../constant/index.js')

// 文件目录生成
function DFSDir(dir, paper_path, res) {
  const papersPathLen = PAPERS_PATH.length
  const dirArray=fs.readdirSync(paper_path)

  for(let i = 0; i < dirArray.length; i++){
    const pathStr = paper_path + '/' + dirArray[i]
    const stats = fs.statSync(pathStr)
    const filePath = pathStr.slice(papersPathLen, pathStr.length)
    if(stats.isDirectory() && dirArray[i] !== '.git'){
      // 添加文件夹
      if(!pathStr.includes(PAPERS_ILLUSTRATION_PATH)) {
        const temp = {
          name: dirArray[i],
          type: 'directory',
          filePath: filePath,
          length: 0,
          children: [],
        }
        dir.push(temp)
      }
    } 
    else if(stats.isFile()) {
      // 添加文件
      const extname=path.extname(dirArray[i]);
      let tempDirInfo = {}
      if(extname === '.md') {
        const url = `${paper_path}/${dirArray[i]}`
        const data = fs.readFileSync(url);
        tempDirInfo = {
          desc: data.toString('utf8', 0, 300) || ''
        }
        dir.push({
          ...tempDirInfo,
          ...{
            name: dirArray[i],
            type: extname || 'file',
            filePath: filePath,
            birthtime: stats.birthtime,
            hitsCount: 0
          }
        })
      }
    }
  }

  for(let i = 0; i < dir.length; i++){
    const pathStr = paper_path + '/' + dir[i].name
    if(dir[i].type === 'directory'){
      DFSDir(dir[i].children, pathStr, res)

      // 计算文章数量
      for(let j = 0; j < dir[i].children.length; j++){
        if(dir[i].children[j].type === 'directory')
        {
          dir[i].length += dir[i].children[j].length
        } else {
          dir[i].length++
        } 
      }
      delete dir[i].children
    }
    res.push(dir[i])
  }
}

module.exports = {
  DFSDir
}