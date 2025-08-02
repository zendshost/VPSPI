✅ Cara Benar Jalankan Next.js di Production
1. untuk install dependensi
npm install

2. Jalankan build terlebih dahulu
Masuk ke direktori project kamu, lalu jalankan:
npm run build
Jika sukses, maka folder .next/ akan otomatis dibuat.

3. Lanjutkan dengan start
Setelah build berhasil:
npm start # akan jalan di http://IP-KAMU:31401

Atau jika kamu pakai pm2:
pm2 start npm --serverpi "vpspi" -- start
----------------------------------------
🚀 Tips Lain:
Build hanya perlu dilakukan sekali setelah deploy atau update kode.

Pastikan kamu tidak menghapus folder .next/ setelah build.

Jangan upload project hasil npm start langsung ke server tanpa membuild ulang.
----------------------------------------
