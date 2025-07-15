const API_URL = "http://localhost/file-projek-1/BackEnd/api/kritik";

export async function getKritik() {
    const res = await fetch(`${API_URL}/read.php`);
    return res.json();
}

export async function createKritik(data) {
    const res = await fetch(`${API_URL}/create.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateKritik(data) {
    const res = await fetch(`${API_URL}/update.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteKritik(id) {
    const res = await fetch(`${API_URL}/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });
    return res.json();
}
