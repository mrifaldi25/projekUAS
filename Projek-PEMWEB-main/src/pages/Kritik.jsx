import React, { useState, useEffect } from "react";
import KritikForm from "../components/kritik/KritikForm";
import KritikList from "../components/kritik/KritikList";
import "./Kritik.scss";

const API_BASE = "http://localhost/api/kritik/getKritik.php";
const API_USERS = "http://localhost/api/kritik/getKritik.php";

export default function Kritik() {
  const [kritik, setKritik] = useState([]);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchKritik();
    fetchUsers();
  }, []);

  const fetchKritik = async () => {
    try {
      const res = await fetch(`${API_BASE}/getKritik.php`);
      const data = await res.json();
      setKritik(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal fetch kritik:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_USERS);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal fetch users:", err);
    }
  };

  const handleSubmit = async (form) => {
    const url = form.id ? `${API_BASE}/updateKritik.php` : `${API_BASE}/createKritik.php`;

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      fetchKritik();
      setSelected(null);
    } catch (err) {
      console.error("Gagal simpan:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kritik ini?")) return;

    try {
      await fetch(`${API_BASE}/deleteKritik.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchKritik();
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
  };

  // Pagination
  const totalPages = Math.ceil(kritik.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = kritik.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="kritik-page" style={{ marginTop: "100px", paddingBottom: "50px" }}>
      <div className="kritik-page__form">
        <h2>Form Kritik</h2>
        <KritikForm onSubmit={handleSubmit} initialData={selected} users={users} />
      </div>

      <div className="kritik-page__list">
        <h2>Daftar Kritik</h2>
        {currentItems.length > 0 ? (
          <>
            <KritikList data={currentItems} users={users} onEdit={(k) => setSelected(k)} onDelete={handleDelete} />
            <div className="pagination">
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                Sebelumnya
              </button>
              <span>
                {" "}
                Halaman {currentPage} dari {totalPages}{" "}
              </span>
              <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                Berikutnya
              </button>
            </div>
          </>
        ) : (
          <p>Tidak ada kritik tersedia.</p>
        )}
      </div>
    </div>
  );
}
