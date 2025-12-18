# Manajemen-Mahasiswa
# 🎓 DataMahasiswa - Sistem Manajemen Mahasiswa Sederhana

<img width="1888" height="971" alt="image" src="https://github.com/user-attachments/assets/cd511fa9-a814-414a-a53b-eae93e0c1763" />


Sistem manajemen data mahasiswa berbasis web yang dirancang untuk mendemonstrasikan implementasi Struktur Data dan Algoritma (Sorting & Searching) dalam lingkungan pengembangan Front-End.

## 🚀 Fitur Utama

* **CRUD Operations**: Menambah, menampilkan, mengedit, dan menghapus data mahasiswa.
* **Data Persistence**: Menggunakan `localStorage` sehingga data tetap tersimpan meskipun browser di-refresh.
* **Algoritma Sorting**: 
    * **Bubble Sort**: Mengurutkan daftar berdasarkan **Nama** secara alfabetis.
    * **Merge Sort**: Mengurutkan daftar berdasarkan **NIM** secara efisien (Divide and Conquer).
* **Algoritma Searching**:
    * **Linear Search**: Mencari data berdasarkan Nama atau NIM secara sekuensial.
    * **Binary Search**: Pencarian cepat berdasarkan NIM (data secara otomatis diurutkan terlebih dahulu agar algoritma bekerja maksimal).
* **Sample Data**: Fitur sekali klik untuk memuat 32 data contoh mahasiswa.
* **Responsive Design**: Menggunakan Bootstrap 5 dan CSS kustom dengan font *Plus Jakarta Sans* agar tampil modern di berbagai perangkat.

## 🛠️ Teknologi yang Digunakan

* **HTML5 & CSS3**: Struktur dan styling antarmuka.
* **JavaScript (Vanilla)**: Logika bisnis dan implementasi algoritma.
* **Bootstrap 5**: Framework CSS untuk grid dan komponen UI.
* **Font Awesome**: Ikonografi.
* **Google Fonts**: Tipografi (Plus Jakarta Sans).

## 📂 Struktur File

```text
├── index.html   # Struktur halaman utama dan UI
├── style.css    # Kustomisasi desain dan tema warna
└── script.js    # Logika CRUD, Algoritma Sorting & Searching
