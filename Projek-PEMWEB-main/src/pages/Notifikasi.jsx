import { useState, useEffect } from "react";
import "./notifikasi.scss"; // Pastikan path ini benar

const API_URL = "http://localhost/api/notifikasi";

export default function Notifikasi() {
  const [notifikasi, setNotifikasi] = useState([]);
  const [isi, setIsi] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState(""); // Untuk pesan notifikasi/error
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Untuk modal konfirmasi
  const [deleteItemId, setDeleteItemId] = useState(null); // Untuk ID item yang akan dihapus

  // Fungsi untuk menampilkan pesan
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000); // Hilangkan pesan setelah 3 detik
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/read.php`);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Gagal ambil data: ${res.status} ${res.statusText} - ${errorText}`);
      }
      const data = await res.json();
      setNotifikasi(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("� Gagal ambil data dari backend:", error.message);
      showMessage(`Gagal ambil data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isi.trim()) {
      showMessage("Isi tidak boleh kosong");
      return;
    }

    const endpoint = editId ? "update.php" : "create.php";
    const payload = editId ? { id: editId, isi } : { isi };

    try {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Gagal menyimpan notifikasi: ${res.status} ${res.statusText} - ${errorText}`);
      }
      setIsi("");
      setEditId(null);
      fetchData();
      showMessage(editId ? "Notifikasi berhasil diupdate!" : "Notifikasi berhasil ditambahkan!");
    } catch (err) {
      console.error("🚨 Gagal simpan notifikasi:", err.message);
      showMessage(`Gagal simpan notifikasi: ${err.message}`);
    }
  };

  const handleEdit = (item) => {
    setIsi(item.isi);
    setEditId(item.id);
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    setShowConfirmModal(false);
    if (!deleteItemId) return;

    try {
      const res = await fetch(`${API_URL}/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteItemId }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Gagal hapus: ${res.status} ${res.statusText} - ${errorText}`);
      }
      fetchData();
      showMessage("Notifikasi berhasil dihapus!");
    } catch (err) {
      console.error("🚨 Gagal hapus notifikasi:", err.message);
      showMessage(`Gagal hapus notifikasi: ${err.message}`);
    } finally {
      setDeleteItemId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setDeleteItemId(null);
  };

  return (
    <div className="notifikasi-container">
      {/* Pesan Notifikasi */}
      {message && <div className="message-box">{message}</div>}

      <h2>{editId ? "Edit Notifikasi" : "Tambah Notifikasi"}</h2>

      <form onSubmit={handleSubmit} className="notifikasi-form">
        {" "}
        {/* Menggunakan notifikasi-form */}
        <textarea rows="4" value={isi} onChange={(e) => setIsi(e.target.value)} placeholder="Tulis isi notifikasi..." required></textarea>
        <div className="form-buttons">
          <button type="submit">{editId ? "Update" : "Tambah"}</button>
          {editId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditId(null);
                setIsi("");
              }}
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="notifikasi-list">
        {" "}
        {/* Menambahkan wrapper untuk daftar notifikasi */}
        <h2>Daftar Notifikasi</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Isi</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {notifikasi.length > 0 ? (
              notifikasi.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.isi}</td>
                  <td>{item.tanggal}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>✏️</button>
                    <button onClick={() => handleDeleteClick(item.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Tidak ada notifikasi</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Yakin ingin hapus notifikasi ini?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete} className="confirm-btn">
                Ya
              </button>
              <button onClick={cancelDelete} className="cancel-btn">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
