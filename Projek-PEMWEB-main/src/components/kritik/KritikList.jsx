export default function KritikList({ data = [], onEdit, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Isi</th>
                    <th>Tanggal</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {(Array.isArray(data) ? data : []).map((k) => (
                    <tr key={k.id}>
                        <td>{k.id}</td>
                        <td>{k.name}</td>
                        <td>{k.isi}</td>
                        <td>{k.tanggal}</td>
                        <td>
                            <button onClick={() => onEdit(k)}>Edit</button>
                            <button onClick={() => onDelete(k.id)}>Hapus</button>
                        </td>
                    </tr>
                ))}
                {data.length === 0 && (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                            Tidak ada data kritik.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
