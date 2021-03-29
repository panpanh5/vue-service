const http = require('http')
const url = require("url");
const fs = require('fs')
const cheerIo = require('cheerio')
const spa = require('./data.json')
const app = http.createServer((req, res) => {
    res.setHeader("content-type", "text/html;charset=utf-8");
    // 分页
    let urlObj = url.parse(req.url)
    if (urlObj.pathname === '/index') {
        console.log(urlObj)
        let str = ''
        // 取参数  page=1,index=5;
        // spa==这个数据取（page-1）*index---page*index
        spa.forEach((v, index) => {
            str = str + `<ul>
        <li><a>${v.title}</a><a>${v.content}</a><span>${v.time}</span></li>
      </ul>`
        })
        // 读取文件
        let indexHtml = fs.readFileSync('./index.html')
        let $ = cheerIo.load(indexHtml)
        // 获取到类名为new-list，插入html代码
        $('.new-list').html(str)
        res.end($.html())
    } else {
        res.end('123')
    }

})
app.listen(7777, () => {
    console.log('服务器启动')
})
