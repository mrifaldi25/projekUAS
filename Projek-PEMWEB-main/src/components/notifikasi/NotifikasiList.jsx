// export default function NotifikasiList({ data, onEdit, onDelete }) {
//     return (
//         <div>
//             <h2>Daftar Notifikasi</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Isi</th>
//                         <th>Tanggal</th>
//                         <th>Aksi</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((n) => (
//                         <tr key={n.id}>
//                             <td>{n.id}</td>
//                             <td>{n.isi}</td>
//                             <td>{n.tanggal}</td>
//                             <td>
//                                 <button onClick={() => onEdit(n)}>✏️ Edit</button>
//                                 <button onClick={() => onDelete(n.id)}>🗑️ Hapus</button>
//                             </td>
//                         </tr>
//                     ))}
//                     {data.length === 0 && (
//                         <tr>
//                             <td colSpan="4">Tidak ada notifikasi.</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
