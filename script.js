// Hadis berdasarkan waktu
const hadiths = [
  { time: "pagi", text: "Sesungguhnya amalan yang paling dicintai Allah adalah yang paling konsisten." },
  { time: "dzuhur", text: "Barang siapa memudahkan urusan orang lain, Allah akan memudahkan urusannya." },
  { time: "jumat", text: "Perbanyaklah shalawat kepadaku pada hari Jumat." },
  { time: "maghrib", text: "Doa antara adzan dan iqamah tidak akan ditolak." }
];

function getHadith() {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 5 = Jumat
  let selected = "";

  const greetings = [
  "Assalamu’alaikum, Khairul!",
  "Semangat pagi, pejuang ilmu!",
  "Bismillah, mulai harimu dengan niat yang lurus.",
  "Jangan lupa bersyukur hari ini ya.",
  "Selamat pagi, semoga Allah berkahi harimu."
];

const hadiths = [
  "Sesungguhnya amalan yang paling dicintai Allah adalah yang paling konsisten.",
  "Barang siapa memudahkan urusan orang lain, Allah akan memudahkan urusannya.",
  "Perbanyaklah shalawat kepadaku pada hari Jumat.",
  "Doa antara adzan dan iqamah tidak akan ditolak.",
  "Setiap amal tergantung niatnya."
];

function getHadithAndGreeting() {
  const greet = greetings[Math.floor(Math.random() * greetings.length)];
  const hadith = hadiths[Math.floor(Math.random() * hadiths.length)];

  document.getElementById("greeting").textContent = greet;
  document.getElementById("dailyHadith").textContent = hadith;
}

  if (day === 5) {
    selected = hadiths.find(h => h.time === "jumat").text;
  } else if (hour < 10) {
    selected = hadiths.find(h => h.time === "pagi").text;
  } else if (hour < 14) {
    selected = hadiths.find(h => h.time === "dzuhur").text;
  } else if (hour < 18) {
    selected = hadiths.find(h => h.time === "maghrib").text;
  } else {
    selected = "Tetap semangat dalam amal hari ini!";
  }

  document.getElementById("dailyHadith").textContent = selected;
}

// To-do
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";
  todos.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById("todoInput");
  if (input.value.trim()) {
    todos.push(input.value.trim());
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
    input.value = "";
  }
}
// Simpan Refleksi Harian
function simpanRefleksi() {
  const teks = document.getElementById("refleksiInput").value.trim();
  if (teks) {
    const tanggal = new Date().toLocaleDateString();
    localStorage.setItem("refleksi_" + tanggal, teks);
    document.getElementById("lastRefleksi").textContent = "Refleksi hari ini tersimpan.";
    document.getElementById("refleksiInput").value = "";
  }
}

// Tampilkan refleksi terakhir (jika ada)
function tampilkanRefleksiHariIni() {
  const tanggal = new Date().toLocaleDateString();
  const saved = localStorage.getItem("refleksi_" + tanggal);
  if (saved) {
    document.getElementById("lastRefleksi").textContent = `📝 Refleksi hari ini: "${saved}"`;
  }
}

// Simpan Catatan Penting
function simpanCatatan() {
  const teks = document.getElementById("catatanInput").value.trim();
  if (teks) {
    const tanggal = new Date().toLocaleDateString();
    localStorage.setItem("catatan_" + tanggal, teks);
    document.getElementById("lastCatatan").textContent = "Catatan disimpan. Akan ditampilkan esok pagi.";
    document.getElementById("catatanInput").value = "";
  }
}

// Tampilkan catatan penting jika ada
function tampilkanCatatanHariIni() {
  const tanggal = new Date().toLocaleDateString();
  const saved = localStorage.getItem("catatan_" + tanggal);
  if (saved) {
    document.getElementById("lastCatatan").textContent = `📌 ${saved}`;
  }
}
let catatanList = JSON.parse(localStorage.getItem("catatanList")) || [];

function renderCatatan() {
  const list = document.getElementById("daftarCatatan");
  list.innerHTML = "";

  catatanList.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.text} <small>[${item.status}]</small><br>
      <button onclick="updateStatus(${index}, 'selesai')">✅ Selesai</button>
      <button onclick="updateStatus(${index}, 'ulang')">🔁 Tunda</button>
      <button onclick="hapusCatatan(${index})">❌ Hapus</button>
    `;
    list.appendChild(li);
  });
}

function tambahCatatan() {
  const input = document.getElementById("catatanInput");
  if (input.value.trim()) {
    catatanList.push({ text: input.value.trim(), status: "Belum" });
    localStorage.setItem("catatanList", JSON.stringify(catatanList));
    input.value = "";
    renderCatatan();
  }
}

function updateStatus(index, status) {
  if (status === 'selesai') {
    catatanList[index].status = "Selesai";
  } else if (status === 'ulang') {
    catatanList[index].status = "Ditunda";
  }
  localStorage.setItem("catatanList", JSON.stringify(catatanList));
  renderCatatan();
}

function hapusCatatan(index) {
  catatanList.splice(index, 1);
  localStorage.setItem("catatanList", JSON.stringify(catatanList));
  renderCatatan();
}
function simpanHafalanMingguan() {
  const hari = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'ahad'];
  hari.forEach(h => {
    const val = document.getElementById(`hafalan-${h}`).value.trim();
    localStorage.setItem(`hafalan-${h}`, val);
  });
  alert("✅ Hafalan mingguan disimpan!");
}

function tampilkanHafalanMingguan() {
  const hari = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'ahad'];
  hari.forEach(h => {
    const val = localStorage.getItem(`hafalan-${h}`);
    if (val) {
      document.getElementById(`hafalan-${h}`).value = val;
    }
  });
}
function toggleHafalan() {
  const wrapper = document.getElementById("hafalanWrapper");
  if (wrapper.style.display === "none") {
    wrapper.style.display = "block";
  } else {
    wrapper.style.display = "none";
  }
}
function exportData() {
  let output = "📤 SIMPUL - Rangkuman Harian 📤\n\n";

  // Refleksi
  const tanggal = new Date().toLocaleDateString();
  const refleksi = localStorage.getItem("refleksi_" + tanggal) || "(belum ada)";
  output += `🧠 Refleksi (${tanggal}):\n${refleksi}\n\n`;

  // Catatan Penting
  const catatanList = JSON.parse(localStorage.getItem("catatanList")) || [];
  output += `📌 Catatan Penting:\n`;
  if (catatanList.length === 0) {
    output += "- Tidak ada catatan aktif.\n\n";
  } else {
    catatanList.forEach((item, i) => {
      output += `${i + 1}. ${item.text} [${item.status}]\n`;
    });
    output += "\n";
  }

  // Hafalan Mingguan
  const hari = ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Ahad'];
  output += `📖 Hafalan Mingguan:\n`;
  hari.forEach(h => {
    const val = localStorage.getItem("hafalan-" + h.toLowerCase()) || "-";
    output += `${h}: ${val}\n`;
  });

  // Tampilkan hasil ke textarea
  const box = document.getElementById("exportOutput");
  box.value = output;
  box.select();
  document.execCommand("copy");
  alert("📋 Data berhasil disalin ke clipboard!\n\nSilakan paste ke dokumen, Notion, atau email.");
}
function hitungStatistik() {
  let output = "";

  // Hafalan Mingguan
  const hari = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'ahad'];
  let hafalanTerisi = 0;
  hari.forEach(h => {
    const val = localStorage.getItem("hafalan-" + h);
    if (val && val.trim() !== "") {
      hafalanTerisi++;
    }
  });
  output += `📖 Hafalan: ${hafalanTerisi} / 7 hari terisi\n`;

  // Refleksi 7 Hari Terakhir
  const now = new Date();
  let refleksiCount = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const tanggal = d.toLocaleDateString();
    const val = localStorage.getItem("refleksi_" + tanggal);
    if (val && val.trim() !== "") {
      refleksiCount++;
    }
  }
  output += `🧠 Refleksi: ${refleksiCount} / 7 hari ditulis\n`;

  // Catatan Penting
  const catatanList = JSON.parse(localStorage.getItem("catatanList")) || [];
  const total = catatanList.length;
  const selesai = catatanList.filter(c => c.status === "Selesai").length;
  const ditunda = catatanList.filter(c => c.status === "Ditunda").length;
  const aktif = total - selesai - ditunda;
  output += `📌 Catatan Penting:\n- Aktif: ${aktif}\n- Selesai: ${selesai}\n- Ditunda: ${ditunda}\n`;

  // Tampilkan
  document.getElementById("statistikOutput").innerText = output;
}
function tampilkanRingkasanPagi() {
  const now = new Date();
  const jam = now.getHours();

  // Tampilkan hanya antara jam 3 - 9 pagi
  if (jam >= 3 && jam <= 9) {
    document.getElementById("ringkasanPagi").style.display = "block";

    let output = "";

    // Ambil catatan aktif
    const catatanList = JSON.parse(localStorage.getItem("catatanList")) || [];
    const aktif = catatanList.filter(c => c.status !== "Selesai");
    if (aktif.length > 0) {
      output += `📌 Catatan Penting:\n`;
      aktif.forEach((c, i) => {
        output += `${i + 1}. ${c.text} [${c.status}]\n`;
      });
    } else {
      output += `✅ Tidak ada catatan aktif hari ini.\n`;
    }

    // Hafalan hari ini
    const hariIni = now.toLocaleDateString('id-ID', { weekday: 'long' }).toLowerCase();
    const hafalan = localStorage.getItem("hafalan-" + hariIni) || "(belum diisi)";
    output += `\n📖 Hafalan Hari Ini (${capitalize(hariIni)}):\n${hafalan}\n`;

    // Refleksi hari ini
    const tanggal = now.toLocaleDateString();
    const refleksi = localStorage.getItem("refleksi_" + tanggal);
    output += `\n🧠 Refleksi Hari Ini: ${refleksi ? "Sudah ditulis" : "Belum ditulis"}\n`;

    document.getElementById("isiRingkasan").innerText = output;
  }
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
function tampilkanRingkasanDashboard() {
  const now = new Date();
  const jam = now.getHours();
  let ringkasan = "";

  if (jam >= 3 && jam <= 9) {
    // Ringkasan pagi
    const catatanList = JSON.parse(localStorage.getItem("catatanList")) || [];
    const aktif = catatanList.filter(c => c.status !== "Selesai");
    ringkasan += `📌 <strong>${aktif.length}</strong> catatan aktif hari ini<br>`;

    const hariIni = now.toLocaleDateString('id-ID', { weekday: 'long' }).toLowerCase();
    const hafalan = localStorage.getItem("hafalan-" + hariIni) || "(belum diisi)";
    ringkasan += `📖 Hafalan hari ini: <em>${hafalan}</em><br>`;

    const tanggal = now.toLocaleDateString();
    const refleksi = localStorage.getItem("refleksi_" + tanggal);
    ringkasan += `🧠 Refleksi: ${refleksi ? "✅ Sudah ditulis" : "⏳ Belum ditulis"}`;
  } else {
    ringkasan = "🌅 Selamat datang! Ayo mulai harimu dengan niat yang lurus.";
  }

  document.getElementById("ringkasanDashboard").innerHTML = ringkasan;
}
function tampilkanKalender() {
  const container = document.getElementById("kalenderContainer");
  container.innerHTML = "";

  const now = new Date();
  const bulanIni = now.getMonth();
  const tahunIni = now.getFullYear();

  // Buat 30 hari mundur ke belakang
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const tanggal = d.toLocaleDateString();
    const hari = d.getDate();

    const refleksi = localStorage.getItem("refleksi_" + tanggal);
    const hariNama = d.toLocaleDateString('id-ID', { weekday: 'long' }).toLowerCase();
    const hafalan = localStorage.getItem("hafalan-" + hariNama);

    // Tentukan kelas
    let kelas = "day-box";
    if (refleksi && hafalan) kelas += " dual";
    else if (refleksi) kelas += " refleksi";
    else if (hafalan) kelas += " hafalan";

    // Elemen hari
    const div = document.createElement("div");
    div.className = kelas;
    div.innerHTML = `<strong>${hari}</strong>`;
    div.title = `📅 ${tanggal}\n🧠 Refleksi: ${refleksi ? "✅" : "❌"}\n📖 Hafalan: ${hafalan ? hafalan : "-"}`;
    container.appendChild(div);
  }
}
function toggleMode() {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark ? "true" : "false");

  // Ganti emoji tombol
  document.getElementById("modeToggle").innerText = isDark ? "☀️ Mode Terang" : "🌙 Mode Gelap";
}

// Jalankan saat load
function setInitialMode() {
  const dark = localStorage.getItem("darkMode") === "true";
  if (dark) {
    document.body.classList.add("dark-mode");
    document.getElementById("modeToggle").innerText = "☀️ Mode Terang";
  }
}


window.onload = function () {
  getHadith();
  renderTodos();
  tampilkanRefleksiHariIni();
  getHadithAndGreeting();
  tampilkanCatatanHariIni();
  renderCatatan();
  tampilkanHafalanMingguan();
  tampilkanRingkasanPagi();
  tampilkanRingkasanDashboard();
  tampilkanKalender();
  setInitialMode();

};
