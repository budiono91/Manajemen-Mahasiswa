// --- KONFIGURASI DATA (LOCALSTORAGE) ---
let mahasiswaData = JSON.parse(localStorage.getItem('mahasiswa')) || [];

document.addEventListener('DOMContentLoaded', () => {
    renderTable(mahasiswaData);
    
    // Form Submit Handler
    document.getElementById('mahasiswaForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveMahasiswa();
    });
});

// --- ALGORITMA SORTING ---

function bubbleSort(data) {
    let arr = [...data];
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j].nama.toLowerCase() > arr[j + 1].nama.toLowerCase()) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

function mergeSort(data) {
    if (data.length <= 1) return data;
    const mid = Math.floor(data.length / 2);
    const left = mergeSort(data.slice(0, mid));
    const right = mergeSort(data.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i].nim < right[j].nim) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
}

// --- FUNGSI SEARCH & SORT HANDLER ---

function handleSort() {
    const algo = document.getElementById('sortAlgo').value;
    if (algo === 'bubble') {
        mahasiswaData = bubbleSort(mahasiswaData);
    } else {
        mahasiswaData = mergeSort(mahasiswaData);
    }
    renderTable(mahasiswaData);
}

function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const type = document.getElementById('searchType').value;
    let results = [];

    if (!query) {
        renderTable(mahasiswaData);
        return;
    }

    if (type === 'linear') {
        results = mahasiswaData.filter(m => 
            m.nim.toLowerCase().includes(query) || 
            m.nama.toLowerCase().includes(query)
        );
    } else {
        // Binary Search butuh data terurut NIM
        let sorted = [...mahasiswaData].sort((a, b) => a.nim.localeCompare(b.nim));
        let low = 0, high = sorted.length - 1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (sorted[mid].nim === query) {
                results = [sorted[mid]];
                break;
            }
            sorted[mid].nim < query ? low = mid + 1 : high = mid - 1;
        }
    }
    renderTable(results);
}

// --- CORE CRUD FUNCTIONS ---

function saveMahasiswa() {
    const editIndex = document.getElementById('edit_index').value;
    const newEntry = {
        nim: document.getElementById('nim').value,
        nama: document.getElementById('nama').value,
        jurusan: document.getElementById('jurusan').value,
        semester: document.getElementById('semester').value
    };

    if (editIndex === "-1") {
        mahasiswaData.push(newEntry);
    } else {
        mahasiswaData[editIndex] = newEntry;
    }

    localStorage.setItem('mahasiswa', JSON.stringify(mahasiswaData));
    resetForm();
    renderTable(mahasiswaData);
}

function deleteMahasiswa(index) {
    if (confirm('Hapus data ini?')) {
        mahasiswaData.splice(index, 1);
        localStorage.setItem('mahasiswa', JSON.stringify(mahasiswaData));
        renderTable(mahasiswaData);
    }
}

function prepareEdit(index) {
    const m = mahasiswaData[index];
    document.getElementById('edit_index').value = index;
    document.getElementById('nim').value = m.nim;
    document.getElementById('nama').value = m.nama;
    document.getElementById('jurusan').value = m.jurusan;
    document.getElementById('semester').value = m.semester;

    const btn = document.getElementById('submitBtn');
    btn.innerText = "Update Data";
    btn.className = "btn btn-success-custom";
    document.getElementById('cancelBtn').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('mahasiswaForm').reset();
    document.getElementById('edit_index').value = "-1";
    const btn = document.getElementById('submitBtn');
    btn.innerText = "Tambah Mahasiswa";
    btn.className = "btn btn-primary-custom";
    document.getElementById('cancelBtn').style.display = "none";
}

function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    const countBadge = document.getElementById('countBadge');
    tbody.innerHTML = '';
    countBadge.innerText = `${data.length} Mahasiswa`;

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">Tidak ada data.</td></tr>';
        return;
    }

    data.forEach((m, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${m.nim}</td>
                <td class="fw-bold">${m.nama}</td>
                <td><span class="badge-jurusan">${m.jurusan}</span></td>
                <td>${m.semester}</td>
                <td class="text-center">
                    <button class="btn btn-sm text-primary" onclick="prepareEdit(${index})"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-sm text-danger" onclick="deleteMahasiswa(${index})"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
    });
}

// --- FUNGSI LOAD SAMPLE DATA (DIPERBARUI) ---
function loadSampleData() {
    mahasiswaData = [
        {nim: "241011400174", nama: "Abdul", jurusan: "Informatika", semester: "2"},
        {nim: "241011401513", nama: "Afifah", jurusan: "Informatika", semester: "2"},
        {nim: "241011402073", nama: "Agistna", jurusan: "Informatika", semester: "2"},
        {nim: "241011402803", nama: "Abim", jurusan: "Informatika", semester: "2"},
        {nim: "241011401521", nama: "Akhdan", jurusan: "Informatika", semester: "2"},
        {nim: "241011401225", nama: "Fathur", jurusan: "Informatika", semester: "2"},
        {nim: "241011402606", nama: "Anas", jurusan: "Informatika", semester: "2"},
        {nim: "241011400144", nama: "Dafi", jurusan: "Informatika", semester: "2"},
        {nim: "241011401477", nama: "Deva", jurusan: "Informatika", semester: "2"},
        {nim: "241011401652", nama: "Dian", jurusan: "Informatika", semester: "2"},
        {nim: "241011402404", nama: "Dimas", jurusan: "Informatika", semester: "2"},
        {nim: "241011400160", nama: "Fikri", jurusan: "Informatika", semester: "2"},
        {nim: "241011400148", nama: "Fira", jurusan: "Informatika", semester: "2"},
        {nim: "241011401516", nama: "Ghali", jurusan: "Informatika", semester: "2"},
        {nim: "241011403290", nama: "Haidar", jurusan: "Informatika", semester: "2"},
        {nim: "241011400169", nama: "Ibnu", jurusan: "Informatika", semester: "2"},
        {nim: "241011401517", nama: "Ika", jurusan: "Informatika", semester: "2"},
        {nim: "241011400171", nama: "Tanto", jurusan: "Informatika", semester: "2"},
        {nim: "241011400150", nama: "Faiz", jurusan: "Informatika", semester: "2"},
        {nim: "241011402691", nama: "Ikhwan", jurusan: "Informatika", semester: "2"},
        {nim: "241011403029", nama: "Fachri", jurusan: "Informatika", semester: "2"},
        {nim: "241011401524", nama: "Fathir", jurusan: "Informatika", semester: "2"},
        {nim: "241011402666", nama: "Raka", jurusan: "Informatika", semester: "2"},
        {nim: "241011400168", nama: "Bayu", jurusan: "Informatika", semester: "2"},
        {nim: "241011402339", nama: "Rafly", jurusan: "Informatika", semester: "2"},
        {nim: "241011403079", nama: "Rakha", jurusan: "Informatika", semester: "2"},
        {nim: "241011402424", nama: "Rendy", jurusan: "Informatika", semester: "2"},
        {nim: "241011401522", nama: "Rashad", jurusan: "Informatika", semester: "2"},
        {nim: "241011400154", nama: "Rivan", jurusan: "Informatika", semester: "2"},
        {nim: "241011400156", nama: "Satria", jurusan: "Informatika", semester: "2"},
        {nim: "241011402645", nama: "Tria", jurusan: "Informatika", semester: "2"},
        {nim: "241011402080", nama: "Yusuf", jurusan: "Informatika", semester: "2"}
    ];
    localStorage.setItem('mahasiswa', JSON.stringify(mahasiswaData));
    renderTable(mahasiswaData);
}