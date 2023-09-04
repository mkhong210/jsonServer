const express = require('express');
const app = express();
// cors 설치 후 
const cors = require('cors');
const fs = require('fs');
var bodyParser = require('body-parser')

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/abc', function (req, res) {
	// 비동기 처리를 따로 안해도 됨 
	const jsonData = fs.readFileSync('./test.json')

	// res.send('Hello World hmm')
	// console.log(req.query);
	// res.send({id:1, name:"bab"})
	res.send(JSON.parse(jsonData));
})
app.get('/abc/:id', function (req, res) {
	const jsonData = fs.readFileSync('./test.json')
	const data = JSON.parse(jsonData);
	const {id} = req.params;
	const aaa = data.filter(n => n.id == id);
	res.send(aaa);
})

app.post('/insert', function (req, res) {
	console.log(req);
	// JSON.stringify - json형태로 만들어줌 
	fs.writeFileSync('./test.json', JSON.stringify({id:2, name:"호로롤"}))
	res.send("성공");
})

app.listen(3000)
// 여기서 받아온 데이터를 위에 req로 올려보냄
// axios.get('/data.json', {params:{page:1}})
// axios.get('/?page=1')