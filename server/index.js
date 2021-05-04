const express = require('express')
const Mock = require('mockjs')

const app = express()
const Random = Mock.Random

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 获取文章列表
app.get('/posts', (req, res) => {
  let list = []
  let count = 200
  for(let i = 0; i < count; i++) {
    let data = Mock.mock({
      id: i,
      title: Random.cparagraph(1),
      content: Random.cparagraph(2, 5),
      time: Random.datetime('yyyy-MM-dd hh:mm:ss'),
      author: Random.cname(),
      'like|1-1000': 1
    })
    list.push(data)
  }

  let pageNo = Number(req.query.pageNo || 0)
  let pageCount = Number(req.query.pageCount || 10)
  let total = count

  let start = (pageNo - 1) * pageCount
  let end = start + pageCount > total ? total : start + pageCount
  console.log(start, end - start)
  let pageTotal = Math.ceil(total / pageCount)
  let ret = list.splice(start, end - start)

  setTimeout(() => {
    res.json({
      list: ret,
      pageNo,
      pageCount,
      pageTotal
    })
  }, 500)
})

app.listen(3001, () => {
  console.log('server listen port is' + ' 3001')
})