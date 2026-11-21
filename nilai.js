function hitungNilaiAkhir(tugas, uts, uas) {
  // Asumsi bobot: Tugas 30%, UTS 30%, UAS 40%
  return (tugas * 0.3) + (uts * 0.3) + (uas * 0.4);
}

function tentukanGrade(nilai) {
  if (nilai >= 80) return 'A';
  if (nilai >= 70) return 'B';
  if (nilai >= 60) return 'C';
  if (nilai >= 50) return 'D';
  return 'E';
}

function buatRekap(daftar) {
  return daftar.map(m => {
    const nilaiAkhir = hitungNilaiAkhir(m.tugas, m.uts, m.uas);
    const grade = tentukanGrade(nilaiAkhir);
    // Dianggap lulus jika grade A, B, atau C
    const lulus = grade === 'A' || grade === 'B' || grade === 'C'; 
    return { ...m, nilaiAkhir, grade, lulus };
  });
}

function hitungRataRata(rekap) {
  if (rekap.length === 0) return 0;
  const total = rekap.reduce((sum, m) => sum + m.nilaiAkhir, 0);
  return (total / rekap.length).toFixed(2);
}

function cariTertinggi(rekap) {
  if (rekap.length === 0) return null;
  return rekap.reduce((max, m) => (m.nilaiAkhir > max.nilaiAkhir ? m : max), rekap[0]);
}

function hitungDistribusiGrade(rekap) {
  const dist = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  rekap.forEach(m => {
    if (dist[m.grade] !== undefined) {
      dist[m.grade]++;
    }
  });
  return dist;
}

function cariMahasiswa(rekap, kataKunci) {
  const keyword = kataKunci.toLowerCase().trim();
  return rekap.filter(m => 
    m.nama.toLowerCase().includes(keyword) || m.nim.includes(keyword)
  );
}

function validasiMahasiswa(input) {
  const errors = [];
  if (typeof input.nim !== 'string' || !/^\d{7}$/.test(input.nim)) {
    errors.push('NIM harus 7 digit angka');
  }
  if (typeof input.nama !== 'string' || input.nama.trim().length < 3) {
    errors.push('Nama minimal 3 karakter');
  }
  for (const kolom of ['tugas', 'uts', 'uas']) {
    const n = input[kolom];
    if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 100) {
      errors.push(`Nilai ${kolom} harus angka 0-100`);
    }
  }
  return errors;
}