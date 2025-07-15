// import { useState, useEffect } from "react";

// export default function KritikForm({ onSubmit, initialData, users }) {
//     const [form, setForm] = useState(initialData || {
//         user_id: "", isi: "", tanggal: ""
//     });

//     useEffect(() => {
//         if (initialData) setForm(initialData);
//     }, [initialData]);

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(form);
//         setForm({ user_id: "", isi: "", tanggal: "" });
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <select name="user_id" value={form.user_id} onChange={handleChange} required>
//                 <option value="">-- Pilih User --</option>
//                 {users.map(u => (
//                     <option key={u.id} value={u.id}>{u.name}</option>
//                 ))}
//             </select>
//             <textarea name="isi" value={form.isi} onChange={handleChange} required />
//             <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} required />
//             <button type="submit">{form.id ? "Update" : "Tambah"}</button>
//         </form>
//     );
// }

import { useState, useEffect } from "react";

export default function KritikForm({ onSubmit, initialData, users = [] }) {
    const [form, setForm] = useState(
        initialData || {
            user_id: "",
            isi: "",
            tanggal: "",
        }
    );

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({
            user_id: "",
            isi: "",
            tanggal: "",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="user_id">Pilih User:</label>
                <select
                    name="user_id"
                    value={form.user_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Pilih User --</option>
                    {(Array.isArray(users) ? users : []).map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="isi">Isi Kritik:</label>
                <textarea
                    name="isi"
                    value={form.isi}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="tanggal">Tanggal:</label>
                <input
                    type="date"
                    name="tanggal"
                    value={form.tanggal}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">
                {form.id ? "Update Kritik" : "Tambah Kritik"}
            </button>
        </form>
    );
}
