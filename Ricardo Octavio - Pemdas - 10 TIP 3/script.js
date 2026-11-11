document.addEventListener("DOMContentLoaded", function () {

  // 1. Tahun otomatis di footer
  document.getElementById("tahun").textContent = new Date().getFullYear();

  // 2. Text changer di hero
  var kata = ["rapi", "responsif", "mudah dipakai", "interaktif"];
  var urutan = 0;
  var pengubah = document.getElementById("textChanger");
  var kurangGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!kurangGerak) {
    setInterval(function () {
      urutan = (urutan + 1) % kata.length;
      pengubah.textContent = kata[urutan];
    }, 2500);
  }

  // 3. Filter kategori galeri proyek
  var tombolFilter = document.querySelectorAll(".btn-filter");
  var itemProyek = document.querySelectorAll(".proyek-item");
  var infoFilter = document.getElementById("infoFilter");

  tombolFilter.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      var kategori = tombol.dataset.filter;
      var jumlah = 0;

      tombolFilter.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-pressed", "false");
      });
      tombol.classList.add("active");
      tombol.setAttribute("aria-pressed", "true");

      itemProyek.forEach(function (item) {
        var cocok = kategori === "semua" || item.dataset.kategori === kategori;
        item.classList.toggle("sembunyi", !cocok);
        if (cocok) jumlah++;
      });

      infoFilter.textContent = "Menampilkan " + jumlah + " proyek.";
    });
  });

  // 4. Validasi form kontak
  var form = document.getElementById("formKontak");
  var pesanSukses = document.getElementById("pesanSukses");

  function validasiField(field) {
    var nilai = field.value.trim();
    var valid = nilai !== "";

    if (valid && field.minLength > 0) {
      valid = nilai.length >= field.minLength;
    }
    if (valid && field.type === "email") {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nilai);
    }

    field.classList.toggle("is-invalid", !valid);
    field.classList.toggle("is-valid", valid);
    return valid;
  }

  var semuaField = form.querySelectorAll("input, textarea");
  semuaField.forEach(function (field) {
    field.addEventListener("blur", function () { validasiField(field); });
    field.addEventListener("input", function () {
      if (field.classList.contains("is-invalid")) validasiField(field);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var semuaValid = true;
    var pertamaSalah = null;

    semuaField.forEach(function (field) {
      if (!validasiField(field)) {
        semuaValid = false;
        if (!pertamaSalah) pertamaSalah = field;
      }
    });

    if (!semuaValid) {
      pesanSukses.classList.add("d-none");
      pertamaSalah.focus();
      return;
    }

    var nama = document.getElementById("nama").value.trim();
    pesanSukses.textContent = "Terima kasih, " + nama + ". Pesan Anda sudah terkirim.";
    pesanSukses.classList.remove("d-none");
    form.reset();
    semuaField.forEach(function (f) { f.classList.remove("is-valid", "is-invalid"); });
  });
});
