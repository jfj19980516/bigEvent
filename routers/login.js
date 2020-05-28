// 加载express
// 创建路由对象
// 把接口挂载到路由对象上
// 导出路由
const path = require('path');
const db = require(path.join(__dirname, '../utils', 'db'));
const utility = require('utility');
const express = require('express');
const router = express.Router();

// -----------写接口--------------

// ---------注册的接口---------*---
router.post('/reguser', async (req, res) => {
    // 接收客户端提交的username和password 直接使用req.body

    // 使用MD5加密
    req.body.password = utility.md5(req.body.password);

    // 添加入库
    let r = await db('insert into user set ?', req.body);
    if (r && r.affectedRows > 0) {
        // 成功
        res.send({ status: 0, message: "注册成功!" });
    } else {
        // 失败
        res.send({ status: 0, message: "注册成功!" });
    }
});

module.exports = router; 