// 加载express
// 创建路由对象
// 把接口挂载到路由对象上
// 导出路由
const path = require('path');
const db = require(path.join(__dirname, '../utils', 'db'));
const utility = require('utility');
// 加载jsonwebtoken模块，用于生成token字符串
const jsonwebtoken = require('jsonwebtoken');
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

// ----------登录的接口--------------
router.post('/login', async (req, res) => {
    // 通过req.body接收username和password
    let username = req.body.username;
    let password = utility.md5(req.body.password);//要获取加密后的密码

    // 判断账号密码是否正确
    let r = await db('select * from user where username=? and password=?', [username, password]);
    // console.log(r);  //查询信息 得到数组   没有查到得到空数组
    if (r && r.length > 0) {
        // 成功
        res.send({
            status: 0,
            message: "登录成功",
            //  token: 'Bearer '+ jsonwebtoken.sign(数据, 用于加密的字符串, 配置项)
            // 'Bearer ' 必须加一个空格 和token字符串隔开
            token: 'Bearer ' + jsonwebtoken.sign(
                { username: req.body.username, id: r[0].id },
                'bigevent',
                { expiresIn: '3 days' }

            )
        });
    } else {
        // 失败
        res.send({ status: 1, message: "登录失败" });
    }
});

module.exports = router; 