# Tugas.ku

Aplikasi Manajemen Penjadwalan Tugas.\
Proyek ini dibangun dengan menggunakan JavaScript murni dengan Webpack sebagai _module bundler_.

![Tech Stack](https://skillicons.dev/icons?i=figma,github,html,scss,bootstrap,javascript,nodejs&theme=light)

<br>

## Perancangan Proyek

- [Dokumen Perancangan Proyek (Google Docs)](https://docs.google.com/document/d/1902lDK4E7bvkTNTMewq2Llc8A9i_x88bD4btK-C3xr4/preview)
- [Perancangan Desain Proyek (Figma)](https://www.figma.com/file/WlTeVHOlRtizZancM6TDog/Untitled?type=design&node-id=39%3A183&t=05XcApShIuCKS9Tm-1)

<br>

---

## Kontribusi

Jika kamu ingin melakukan kontribusi ke proyek ini, kamu dapat melakukan `fork` terlebih dahulu. Setelah itu, `pull request` kamu akan di review oleh anggota tim _**C23-M4014**_.

<br>

### Penggunaan

Setelah melakukan `fork`, kamu dapat menggunakan _script runner_ dibawah

1. Untuk menjalankan proyek mode _development_.

```bash
npm run start:dev
```
Secara _default_, proyek mode _development_ berjalan di

```bash
https://127.0.0.1:5000/
```

1. Untuk melakukan _build_ proyek mode _production_.

```bash
npm run start:prod
```
3. Menghidupkan `http-server`.

```bash
npm run serve
```

4. Jika kamu ingin melakukan _build_ sekaligus menghidupkan `http-server` setelah build, kamu dapat melakukan.

```bash
npm run serve:prod
```

5. Selengkapnya dapat dilihat di `package.json` pada bagian `"scripts"`.

---

## Deskripsi

Kami mengutamakan performa kecepatan aplikasi sehingga JavaScript murni menjadi pilihan kami sebagai tech stack utama pada proyek ini.

Selain itu, aplikasi "Tugas.ku" dapat dijalankan secara offline dengan bantuan teknologi _**Progressive Web Apps**_. Untuk dapat menyimpan data yang diinput oleh pengguna, kami memanfaatkan Web Storage API. Dengan bantuan `localStorage` kami dapat mengelola data yang diinput oleh pengguna.
