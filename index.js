const  express = require('express');
const app = express();
const port = 3055;

const mongoose = require('mongoose');

mongoose.connect(' mongodb://127.0.0.1:27017`',{
	useNewUrlParser: true	
}).then(()=>console.log('몽고 디비 접속')).catch(err=>console.log);



app.get('/', (req,res)=>res.send('안녕 세상아~~~'));
app.listen(port, ()=>console.log(`예제 앱은 포트 ${port}에서 듣고 있습니다.`));
