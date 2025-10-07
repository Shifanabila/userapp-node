require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// === Koneksi ke PostgreSQL ===
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// === Pastikan folder upload ada ===
const storagePath = process.env.STORAGE_PATH || 'uploads';
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath);
}

// === Konfigurasi upload file ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, storagePath),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// === CSS sederhana untuk tampilan modern ===
const style = `
  body {
    font-family: 'Poppins', sans-serif;
    background: #f4f6f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
  }
  h2 {
    color: #333;
  }
  form {
    background: #fff;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    width: 320px;
  }
  input {
    display: block;
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
  }
  button {
    background: #5c67f2;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }
  button:hover {
    background: #4048c9;
  }
  a {
    color: #5c67f2;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  .user-card {
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    margin-bottom: 20px;
    text-align: center;
    width: 280px;
  }
  img {
    border-radius: 10px;
    margin-top: 10px;
    width: 100%;
    max-width: 250px;
  }
`;

// === Halaman utama ===
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Form Input Pengguna</title>
      <style>${style}</style>
    </head>
    <body>
      <h2>🧍 Form Input Pengguna</h2>
      <form method="POST" action="/users" enctype="multipart/form-data">
        <input name="name" placeholder="Nama lengkap" required>
        <input name="email" placeholder="Email" required>
        <input type="file" name="photo" accept="image/*" required>
        <button type="submit">💾 Simpan</button>
      </form>
      <br>
      <a href="/users">📋 Lihat Data Pengguna</a>
    </body>
    </html>
  `);
});

// === Simpan data ===
app.post('/users', upload.single('photo'), async (req, res) => {
  const { name, email } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT, email TEXT, photo TEXT)');
    await pool.query('INSERT INTO users (name, email, photo) VALUES ($1, $2, $3)', [name, email, photo]);
    res.redirect('/users');
  } catch (err) {
    console.error('DETAIL ERROR:', err);
    res.status(500).send('Error saat menyimpan data: ' + err.message);
  }
});

// === Tampilkan data pengguna ===
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
    const users = result.rows;

    const userCards = users.map(u => `
      <div class="user-card">
        <strong>${u.name}</strong><br>
        <small>${u.email}</small><br>
        ${u.photo ? `<img src="/uploads/${u.photo}" alt="Foto ${u.name}">` : ''}
      </div>
    `).join('');

    res.send(`
      <html>
      <head>
        <title>Daftar Pengguna</title>
        <style>${style}</style>
      </head>
      <body>
        <h2>📋 Daftar Pengguna</h2>
        <a href="/">⬅️ Kembali</a><br><br>
        ${userCards || '<p>Belum ada data pengguna.</p>'}
      </body>
      </html>
    `);
  } catch (err) {
    console.error('DETAIL ERROR:', err);
    res.status(500).send('Gagal menampilkan data: ' + err.message);
  }
});

app.use('/uploads', express.static(storagePath));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server berjalan di http://localhost:${PORT}`));
