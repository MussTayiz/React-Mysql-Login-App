const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_ITEMS_QUERTY = 'SELECT * FROM Kullanici_Bilgileri';

const connection = mysql.createConnection({
	host: 		'localhost',
	user: 		'login_user',
	password: 	'loginParola',
	database:  	'LoginDB'
});


connection.connect(err => {
	if(err){
		return err;
	}
});



app.use(cors());

app.get('/', (req, res) => {
	res.send('Sunucu Aktif');
});


app.get('/showData', (req, res) => {
	connection.query(SELECT_ALL_ITEMS_QUERTY, (err, results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.json({
				data: results
			})
		}
	});
});

const listenPort = 4001;
app.listen(listenPort, () => {
	console.log('Sunucu dinlemede : ' + listenPort)
});