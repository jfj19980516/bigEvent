// 加载express
// 创建路由对象
// 把接口挂载到路由对象上
// 导出路由

const express = require('express');
const path = require('path');
const db = require(path.join(__dirname, '../utils', 'db'));
const router = express.Router();

// -----------写接口--------------

// ------------获取文章分类列表--------------
router.get('/cates', async (req, res) => {
    let r = await db('select * from category');
    if (r) {
        res.send({
            status: 0,
            message: '获取文章分类列表成功',
            data: r
        });
    } else {
        res.send({ status: 1, message: '获取文章分类列表失败' })
    }
});

// ------------新增文章分类列表--------------
router.post('/addcates', async (req, res) => {
    let r = await db('insert into category set ?', req.body);
    if (r && r.affectedRows > 0) {
        res.send({ status: 0, message: '添加分类成功' });
    } else {
        res.send({ status: 1, message: '添加分类失败' });
    }
});
// ------------根据ID删除文章分类--------------
router.get('/deletecate/:id', async (req, res) => {
    let id = req.params.id; //先拿到id
    if (id != req.user.id) {
        return res.send({ status: 1, message: 'id错误，请重新登录' });
    }
    let r = await db('delete from category where id=?', id);
    if (r && r.affectedRows > 0) {
        res.send({ status: 0, message: '删除分类成功' });
    } else {
        res.send({ status: 0, message: '删除分类成功' });
    }
});

// ------------根据ID更新文章分类--------------
router.post('/updatecate', async (req, res) => {
    if (req.body.Id != req.user.id) {
        return res.send({ status: 1, message: 'id错误，请重新登录' });
    }
    let r = await db('update category set ? where Id=?', [req.body, req.body.Id]);
    if (r && r.affectedRows > 0) {
        res.send({ status: 0, message: '更新成功' });
    } else {
        res.send({ status: 0, message: '更新失败' });
    }
});


module.exports = router; 