    <?php
    $conn = new mysqli("localhost", "root", "", "movieverse");
    if ($conn->connect_error) {
        die("Koneksi gagal: " . $conn->connect_error);
    }

    // === TAMBAH / EDIT ===
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $id = $_POST['id'] ?? '';
        $user_id = $_POST['user_id'];
        $isi = $_POST['isi'];
        $tanggal = $_POST['tanggal'];

        if ($id) {
            // Update kritik
            $stmt = $conn->prepare("UPDATE kritik SET user_id = ?, isi = ?, tanggal = ? WHERE id = ?");
            $stmt->bind_param("issi", $user_id, $isi, $tanggal, $id);
            $stmt->execute();
        } else {
            // Tambah kritik
            $stmt = $conn->prepare("INSERT INTO kritik (user_id, isi, tanggal) VALUES (?, ?, ?)");
            $stmt->bind_param("iss", $user_id, $isi, $tanggal);
            $stmt->execute();
        }
        header("Location: " . $_SERVER['PHP_SELF']);
        exit();
    }

    // === HAPUS ===
    if (isset($_GET['delete'])) {
        $id = $_GET['delete'];
        $conn->query("DELETE FROM kritik WHERE id = $id");
        header("Location: " . $_SERVER['PHP_SELF']);
        exit();
    }

    // === AMBIL DATA ===
    $kritik = $conn->query("SELECT k.id, k.user_id, u.name, k.isi, k.tanggal FROM kritik k JOIN users u ON k.user_id = u.id ORDER BY k.id DESC");
    $users = $conn->query("SELECT id, name FROM users");

    // === MODE EDIT ===
    $editData = null;
    if (isset($_GET['edit'])) {
        $id = $_GET['edit'];
        $res = $conn->query("SELECT * FROM kritik WHERE id = $id");
        $editData = $res->fetch_assoc();
    }
    ?>

    <!DOCTYPE html>
    <html>

    <head>
        <title>CRUD Kritik</title>
        <style>
            body {
                font-family: Arial;
                padding: 20px;
            }

            table {
                border-collapse: collapse;
                width: 100%;
                margin-top: 20px;
            }

            th,
            td {
                border: 1px solid #aaa;
                padding: 8px;
            }

            input,
            select,
            textarea {
                width: 100%;
                padding: 6px;
                margin: 5px 0;
            }
        </style>
    </head>

    <body>
        <h2><?= $editData ? "Edit Kritik" : "Tambah Kritik" ?></h2>

        <form method="post">
            <input type="hidden" name="id" value="<?= $editData['id'] ?? '' ?>">

            <label for="user_id">User:</label>
            <select name="user_id" required>
                <option value="">-- Pilih User --</option>
                <?php while ($u = $users->fetch_assoc()): ?>
                    <option value="<?= $u['id'] ?>" <?= isset($editData) && $editData['user_id'] == $u['id'] ? 'selected' : '' ?>>
                        <?= htmlspecialchars($u['name']) ?>
                    </option>
                <?php endwhile; ?>
            </select>

            <label for="isi">Isi Kritik:</label>
            <textarea name="isi" rows="4" required><?= $editData['isi'] ?? '' ?></textarea>

            <label for="tanggal">Tanggal:</label>
            <input type="date" name="tanggal" value="<?= $editData['tanggal'] ?? date('Y-m-d') ?>" required>

            <button type="submit"><?= $editData ? "Update" : "Tambah" ?></button>
            <a href="index.php" style="margin-left:10px; text-decoration:none; padding:6px 12px; background:#ccc; color:#000; border-radius:4px;">🔙 Kembali</a>

            <?php if ($editData): ?>
                <a href="<?= $_SERVER['PHP_SELF'] ?>">Batal</a>
            <?php endif; ?>
        </form>

        <h2>Daftar Kritik</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama User</th>
                    <th>Isi Kritik</th>
                    <th>Tanggal</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = $kritik->fetch_assoc()): ?>
                    <tr>
                        <td><?= $row['id'] ?></td>
                        <td><?= htmlspecialchars($row['name']) ?></td>
                        <td><?= htmlspecialchars($row['isi']) ?></td>
                        <td><?= $row['tanggal'] ?></td>
                        <td>
                            <a href="?edit=<?= $row['id'] ?>">✏️ Edit</a> |
                            <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Yakin ingin hapus kritik ini?')">🗑️ Hapus</a>
                        </td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </body>

    </html>