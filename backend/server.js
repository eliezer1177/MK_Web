const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const bodyparser = require('body-parser')
const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}))
app.use(cors())

const db = mysql.createConnection({
  host: 'localhost',
  database: 'mahasiswa',
  user: 'root',
  password: '',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Terhubung ke MySQL');

  app.get('/', (req, res) => {
    const sql = 'SELECT * FROM informatika';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  app.post('/tambah', (req, res) => {
  
    const insertsql = `INSERT INTO informatika (nim, nama, angkatan) VALUES ('${req.body.nim}', '${req.body.nama}', '${req.body.angkatan}')`;
    db.query(insertsql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
  });

  app.delete('/hapus', (req, res) => {
  
    const deletesql = `DELETE FROM informatika WHERE nim = '${req.body.nim}'`;
    db.query(deletesql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
  });

});

app.listen(8000, () => {
  console.log('Server berjalan di http://localhost:8000');
});
