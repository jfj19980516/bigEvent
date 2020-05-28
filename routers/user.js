// 加载express
// 创建路由对象
// 把接口挂载到路由对象上
// 导出路由

const express = require('express');
const router = express.Router();

// ---------------------     写接口      ---------------------------
// 获取用户信息接口
router.get('/userinfo', (req, res) => {
    // 
    console.log(req.user);
});

module.exports = router; 