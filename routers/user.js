// 加载express
// 创建路由对象
// 把接口挂载到路由对象上
// 导出路由

const express = require('express');
const path = require('path');
const db = require(path.join(__dirname, '../utils', 'db'));
const utility = require('utility');
const router = express.Router();

// ---------------------     写接口      ---------------------------
// 获取用户信息接口
router.get('/userinfo', async (req, res) => {
    // 
    let r = await db('select id,username,nickname,email,user_pic from user where id=?', req.user.id);
    if (r && r.length > 0) {
        res.send({
            status: 0,
            maessage: "获取用户信息成功",
            data: r[0]
        });
    } else {
        res.send({ status: 1, maessage: "获取用户信息失败!" });
    }

});

// ---------------更新密码接口-----------------
router.post('/updatepwd', async (req, res) => {
    // 先获取新密码和旧密码
    let oldPwd = utility.md5(req.body.oldPwd);
    let newPwd = utility.md5(req.body.newPwd);
    // 1.判断新旧密码是否一致
    if (oldPwd == newPwd) {
        return res.send({ status: 1, maessage: "新旧密码不能一致" });
    }
    // 2.先检查原密码是否正确
    let r1 = await db('select * from user where password=? and id=?', [oldPwd, req.user.id]);
    if (r1.length === 0 || r1 === undefined) {
        return res.send({ status: 1, maessage: "原密码错误" });
    }
    // 3.更新密码 
    let r2 = await db('update user set password=? where id=?', [newPwd, req.user.id]);
    if (r2 && r2.affectedRows > 0) {
        res.send({ status: 0, maessage: "更新密码成功" });
    } else {
        res.send({ status: 1, maessage: "更新密码失败" });
    }
});

// --------------更换头像---------------------
router.post('/update/avatar', async (req, res) => {
    let r = await db('update user set user_pic=? where id=?', [req.body.avatar, req.user.id]);
    if (r && r.affectedRows > 0) {
        res.send({ status: 0, maessage: "更换头像成功" });
    } else {
        res.send({ status: 1, maessage: "更换头像失败" });
    }
});

// --------------更新用户信息---------------------------
router.post('/userinfo', async (req, res) => {
    // 判断一下提交的id是否和当前用户的id一致
    if (req.body.id != req.user.id) {
        return res.send({ status: 0, maessage: 'id错误请重新登录' });
    }
    let r = await db('update user set ? where id=?', [req.body, req.user.id]);
    if (r && r.affectedRows > 0) {
        res.send({ status: 0, maessage: '更新用户信息成功' });
    } else {
        res.send({ status: 1, maessage: '更新用户信息失败' });
    }
});

module.exports = router; 