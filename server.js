import 'dotenv/config'
import jwt from "jsonwebtoken";
import express from "express"
import mysql from "mysql2"

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected...');
});

// * ==== Middleware ====
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// * ==== generate token ====
app.post('/login', (req, res) => {
    const user = { id: 1, username: "admin" };
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// * ==== CRUD ====
app.get('/mahasiswa', authenticateToken, (req, res) => {
    db.query("SELECT * FROM mahasiswa", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/mahasiswa', authenticateToken, (req, res) => {
    const { nama, nim } = req.body;
    db.query("INSERT INTO mahasiswa (nama, nim) VALUES (?, ?)", [nama, nim], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, nama, nim });
    });
});

app.put('/mahasiswa/:id', authenticateToken, (req, res) => {
    const { nama, nim } = req.body;
    db.query("UPDATE mahasiswa SET nama=?, nim=? WHERE id=?", [nama, nim, req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: "Mahasiswa updated" });
    });
});

app.delete('/mahasiswa/:id', authenticateToken, (req, res) => {
    db.query("DELETE FROM mahasiswa WHERE id=?", [req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: "Mahasiswa deleted" });
    });
});

app.listen(5000, () => console.log('Server running on port 3000'));
