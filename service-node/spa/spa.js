const http = require('http');
const cheerIo = require('cheerio')
const webUrl = 'http://www.gs.chinanews.com/gdxw/index.html'
const fs = require('fs')
// 两者结合起来做爬虫乱码
const Bufferhelper = require('bufferhelper')
const iconv = require("iconv-lite");

http.get(webUrl, (res) => {
    var bufferHelper = new Bufferhelper();
    res.on('data', function (chunk) {
        bufferHelper.concat(chunk);
    });
    res.on('end', function () {
        formatData(iconv.decode(bufferHelper.toBuffer(), 'gb2312'));

    });
})

function formatData(html) {
    // 载入html元素  载入之后和jquery用法一样  利用cheerIo做爬虫
    let $ = cheerIo.load(html)
    let arr = []
    $('#roll_list li').each((index, item) => {
        let obj = {
            id: index + 1,
            title: $(item).children().first().text(),
            content: $(item).children().eq(1).text(),
            time: $(item).find('span').text()
        }
        console.log(obj)
        arr.push(obj)
    })
    fs.writeFileSync('./data.json', JSON.stringify(arr))
}