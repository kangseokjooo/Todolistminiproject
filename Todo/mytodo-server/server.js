const express = require('express');
const app = express();
const PORT = 8000;
const db=require('./models');
const cors=require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//router 분리
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

//오류처리
app.use('*', (req, res) => {
    res.status(404).render('404');
});

//force:true 항상 테이블을 삭제 후 생성
//force:false(defualt)테이블이 존재하면 패쓰 없으면 생성 
db.sequelize.sync({force:true}).then(()=>{
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
})

