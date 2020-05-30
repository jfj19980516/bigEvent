// 加载express
// 创建路由对象
// 把接口挂载到路由对象上
// 导出路由
const path = require('path');
const db = require(path.join(__dirname, '../utils', 'db'));
const express = require('express');


const router = express.Router();

// -----------写接口--------------

// ------------------ 发布新文章  ----------------------
// ------------------ 获取文章列表数据  ----------------------
router.get('/List', async (req, res) => {
    // 获取4个参数
    let pagenum = req.query.pagenum || 1;//默认获取第一页的数据
    let pagesize = req.query.pagesize || 2;//默认每页显示两条
    let cate_id = req.query.cate_id;//分类id
    let state = req.query.state;//状态

    // 组合where条件
    let w = '';
    if (cate_id) {
        w += 'cate_id=' + cate_id + 'and';
    }
    if (state) {
        w += `state='${state}' and`;
    }

    // 查询文章列表数据
    let r = await db(`select a.Id, a.title, a.pub_date, a.state, c.name cate_name from article a
    join category c on a.cate_id=c.Id
    where ${w} author=? limit ${(pagenum - 1) * pagesize},${pagesize}`, req.user.id);
    // 查询文章总数
    let r2 = await db(`select count(*) total from article where ${w} author=?`, req.user.id);
    if (r && r2) {
        res.send({
            status: 0,
            message: '获取文章列表数据成功',
            data: r,
            total: r2[0].total
        });
    } else { res.send({ status: 1, message: '获取文章列表数据失败' }) }
});
// ------------------ 根据id删除文章数据  ----------------------
// ------------------ 根据id获取文章详情  ----------------------
// ------------------ 根据id更新文章信息  ----------------------

module.exports = router; 