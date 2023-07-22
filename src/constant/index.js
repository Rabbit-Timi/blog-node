/*
 * @Description: 常量
 * @Author: timmtiy
 * @Date: 2023-05-30 18:29:44
 * @LastEditors: timmtiy
 * @LastEditTime: 2023-07-21 09:46:10
 */

const { BASE_PATH } = require('../app/config.js')

// 资源地址
exports.PAPERS_PATH = `${BASE_PATH}/papers`
exports.PAPERS_ILLUSTRATION_PATH = `${BASE_PATH}/papers/illustration`
exports.LOGO_PATH = `${BASE_PATH}/Logo`

// 生成数据地址
const base_path = __dirname.slice(0, __dirname.length - 8)
exports.DIRECTORY_PATH = `${base_path}/data/directory.json`
// exports.PAGE_HITS_PATH = `${base_path}/data/page_hits.json`

exports.CONTENT_TYPE = {
  css: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  png: 'image/png',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tiff: 'image/tiff',
  txt: 'text/plain',
  wav: 'audio/x-wav',
  wma: 'audio/x-ms-wma',
  wmv: 'video/x-ms-wmv',
  xml: 'text/xml',
}
