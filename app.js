const path = require('path');
const cors = require('cors');
const express = require('express');
const expressJWT = require('express-jwt');
const app = express();
app.listen(3007, () => console.log('大事件项目启动'));


// --------配置应用级别的中间件-----------

app.use(cors());
app.use(express.urlencoded({ extended: false }));
// 解析token字符串，控制哪些接口必须登录才能访问
// 把用户保存的数据放在req.user的变量上
app.use(expressJWT({ secret: 'bigevent' }).unless({ path: /^\/api/ }));

// --------加载路由模块,配置好中间件----------------
// app.use('前缀', require(xxxxxx));
app.use('/api', require(path.join(__dirname, 'routers', 'login')));
app.use('/my', require(path.join(__dirname, 'routers', 'user')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'article')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'category')));


// 错误处理中间件
// 处理错误中间件 必须是4个参数
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.log(err.message);
        res.status(401).send({ status: 1, message: "身份认证失败！" });
    }
});
