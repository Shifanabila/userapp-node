# 💻 Aplikasi CRUD Data Pengguna – Node.js + PostgreSQL (Railway)

📚 **Ujian Praktik Cloud Developer – PaaS Project**

🧑‍💻 Oleh: *Sipa Nabila – XI SIJA B*  
📅 Tahun: 2025  

---

## 🧩 Deskripsi Proyek

Proyek ini merupakan aplikasi web sederhana yang dibuat menggunakan **Node.js** dan **Express.js** sebagai backend server, dengan **PostgreSQL** sebagai database utama, dan **Railway** sebagai platform cloud untuk hosting database maupun aplikasi.

Aplikasi ini memiliki fungsi utama untuk:

* 📥 Menyimpan data pengguna berupa **nama** dan **email** ke dalam database PostgreSQL  
* 📤 Mengunggah foto profil pengguna ke folder penyimpanan server  
* 📜 Menampilkan seluruh data pengguna yang sudah tersimpan  
* 🔐 Menggunakan file **.env** untuk menyimpan konfigurasi koneksi database secara aman  

Proyek ini dirancang untuk mensimulasikan penggunaan **Platform as a Service (PaaS)** dalam pengembangan aplikasi berbasis cloud.

---

## 📊 Fitur Aplikasi

| Fitur | Deskripsi |
|-------|------------|
| 📝 **Tambah Data Pengguna** | Menginput nama dan email pengguna melalui form web |
| 📸 **Upload Foto Profil** | Mengunggah gambar profil dan menyimpannya secara lokal |
| 🗃️ **Simpan ke Database** | Menyimpan data ke PostgreSQL yang terhubung ke Railway |
| 📋 **Tampilkan Data** | Menampilkan semua data pengguna yang tersimpan |
| 🔐 **Environment Variables** | Menggunakan `.env` untuk menjaga keamanan data sensitif |

---

## 🧰 Teknologi yang Digunakan

| Teknologi | Fungsi |
|------------|--------|
| **Node.js** | Menjalankan server backend |
| **Express.js** | Framework web untuk routing dan middleware |
| **PostgreSQL** | Database relasional untuk menyimpan data pengguna |
| **Multer** | Mengelola upload file foto |
| **dotenv** | Mengatur environment variables |
| **Railway** | Platform cloud untuk hosting aplikasi dan database |

---

## 📁 Struktur Direktori Project

```bash
📦 userapp-node
├── 📂 node_modules/
├── 📂 sql/
│   └── 📄 init.sql
├── 📂 uploads/
├── 📄 .env
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
└── 📄 server.js
### 1️⃣ Membuat Database di Railway

1. Masuk ke [https://railway.app](https://railway.app)
2. Klik **New Project → Provision PostgreSQL**
3. Setelah database terbuat, klik tab **Connect**
4. Salin **DATABASE URL** dalam format seperti ini:

   ```
   postgresql://USER:PASSWORD@containers-us-west-XX.railway.app:5432/railway
   ```

---

### 2️⃣ Konfigurasi Environment Variable

Buat file `.env` di root proyek dan isi dengan:

```env
DATABASE_URL=postgresql://USER:PASSWORD@containers-us-west-XX.railway.app:5432/railway
STORAGE_PATH=./storage
PORT=3000
```

📌 Penjelasan:

* `DATABASE_URL` → alamat koneksi database PostgreSQL dari Railway
* `STORAGE_PATH` → lokasi penyimpanan file upload di server
* `PORT` → port tempat aplikasi berjalan

---

### 3️⃣ Instalasi Dependencies

Jalankan perintah berikut di terminal:

```bash
npm init -y
npm install express pg multer dotenv ejs
```

---

### 4️⃣ Struktur Database

Tabel yang digunakan bernama `users`:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  photo VARCHAR(255)
);
```
<img width="752" height="393" alt="image" src="https://github.com/user-attachments/assets/af07ac0f-98d2-4d73-98bf-efdce1eaa58d" />


Kolom:

* `id` → Primary key auto increment
* `name` → Nama pengguna
* `email` → Email pengguna
* `photo` → Nama file foto yang di-upload

---

### 5️⃣ Membuat Server Express

File utama: `server.js`
Tugas utamanya:

* Membuat koneksi ke database PostgreSQL
* Menerima input data dan menyimpannya ke database
* Menyimpan file upload ke folder `storage/`
* Mengambil dan menampilkan data pengguna ke halaman web

---

### 6️⃣ Menjalankan Server Lokal

```bash
node server.js
```

Jika berhasil, akan muncul:

```
🚀 Server berjalan di http://localhost:3000
✅ Tabel 'users' siap digunakan
```

Lalu buka browser: [http://localhost:3000](http://localhost:3000)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e7d54585-9ffc-4d01-b082-fb9d68328c5b" />


---

## ☁️ Deployment ke Railway (Opsional)

1. Push project ke GitHub
   <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/70a4994b-ac67-44db-bd5d-d92237a9e3a8" />

3. Buka [Railway](https://railway.app) → New Project → Deploy from GitHub
   <img width="510" height="213" alt="image" src="https://github.com/user-attachments/assets/b49e9d84-63c5-4d85-88b4-d1538ae83a8c" />

   <img width="804" height="732" alt="image" src="https://github.com/user-attachments/assets/2463ce3a-f8d7-442b-8c5c-d2facb760fbc" />

5. Tambahkan variabel `DATABASE_URL`, `STORAGE_PATH`, dan `PORT` di menu **Settings > Variables**
   <img width="1284" height="465" alt="image" src="https://github.com/user-attachments/assets/79ba22af-d162-437d-9c8a-765ea8911a30" />

7. Klik **Deploy**
8. Buka URL yang diberikan Railway untuk melihat aplikasi berjalan di cloud
   <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/32a5785c-80db-437d-91c2-74765ff853ea" />
9. Link Url
   https://projectpaas-production-9270.up.railway.app/
   
---
## 🧪 Contoh Hasil Tampilan

 **Form Input Pengguna:**

* Form input `Nama`
* Form input `Email`
* Upload file gambar profil

📋 **Daftar Pengguna:**

* Menampilkan data dari database
* Gambar profil ditampilkan dalam bentuk bulat
* Nama dan email pengguna muncul secara otomatis setelah disimpan

---

## 🛡️ Keamanan

* ❌ Tidak menyimpan password database secara langsung di kode.
* ✅ Menggunakan `.env` untuk menyimpan konfigurasi penting.
* ✅ File `.env` tidak diunggah ke GitHub (`.gitignore`).

---

## 💡 Pembelajaran yang Didapat

Selama mengerjakan proyek ini, hal-hal penting yang dipelajari:

* 🌐 Cara membuat dan menghubungkan **database cloud PostgreSQL** dengan Node.js
* 📁 Cara mengelola **file upload dan persistent storage**
* 🔐 Penerapan **environment variables** untuk keamanan koneksi
* 🛠️ Proses membangun aplikasi dari backend hingga frontend secara terintegrasi

---

## 👩‍💻 Penutup

Proyek ini membuktikan bahwa pengembangan aplikasi cloud sederhana dapat dilakukan secara **efisien, aman, dan scalable** menggunakan kombinasi **Node.js**, **Express**, **PostgreSQL**, dan **Railway**.

---

📌 **Dibuat oleh:**

**Shifa Nabila Amanda** – XII SIJA B

📍 SMKN 2 Depok Sleman – 2025
