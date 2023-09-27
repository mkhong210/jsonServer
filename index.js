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

app.get('/commu_list', function (req, res) { 
	const jsonD = fs.readFileSync('./community.json')
	res.send(JSON.parse(jsonD))
})

app.get('/commu_list/:id', function (req, res) { 
	const jsonD = fs.readFileSync('./community.json')
	const data = JSON.parse(jsonD)
	const {id} = req.params
	const aaa = data.filter(n=>n.id == id)
	res.send(aaa)
})

app.post('/insert', function (req, res) { 
	let jsonD = JSON.parse(fs.readFileSync('./community.json'))
	fs.writeFileSync('./community.json',JSON.stringify([...jsonD,{...req.body}]))
	let newjson = JSON.parse(fs.readFileSync('./community.json'))
	res.send(newjson);
})

app.post('/del', function (req, res) { 
	let {deldata} = req.body
	fs.writeFileSync('./community.json',JSON.stringify(deldata))
	let newjson = JSON.parse(fs.readFileSync('./community.json'))
	res.send(newjson);
})

app.listen(3030)
// 여기서 받아온 데이터를 위에 req로 올려보냄
// axios.get('/data.json', {params:{page:1}})
// axios.get('/?page=1')