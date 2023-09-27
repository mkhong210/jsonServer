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

// 서버에서는 get post 만 있고 delete는 없음둥 
app.get('/abc', function (req, res) {
	// 비동기 처리를 따로 안해도 됨 
	const jsonData = fs.readFileSync('./community.json')

	res.send('Hello World hmm')
	console.log(req.query);
	res.send({id:1, name:"bab"})

	res.send(JSON.parse(jsonData));

	// data 안에 묶어 두면 간략해짐
	// res.send(data.select());
})

app.get('/abc/:id', function (req, res) {
	const jsonData = fs.readFileSync('./community.json');
	const data = JSON.parse(jsonData);
	// const jsonData = data.select();

	const {id} = req.params;
	const aaa = jsonData.filter(n => n.id != id);
	// fs.writeFileSync('./community.json', JSON.stringify(deldata))

	res.send(aaa);
	// res.send(data.delete());
})

app.post('/insert', function (req, res) {
	console.log(req.body);

	const jsonData = JSON.parse(fs.readFileSync('./community.json'));

	// JSON.stringify - json형태로 만들어줌 
	req.body = msg
	req.body = {msg: asdfg}
	// 구조분해 : ...req.body = msg:asdfg
	let data = [...jsonData, {id:jsonData.length+1, ...req.body}];

	fs.writeFileSync('./community.json', JSON.stringify(data))
	let newData = JSON.parse(fs.readFileSync('./community.json'))
	res.send(newData);
	res.send("성공");

	// data로 정리 
	// res.send(data.insert(req.body));
})

app.listen(3000)
// 여기서 받아온 데이터를 위에 req로 올려보냄
// axios.get('/data.json', {params:{page:1}})
// axios.get('/?page=1')