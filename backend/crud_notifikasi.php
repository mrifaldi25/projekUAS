<?php
$conn = new mysqli("localhost", "root", "", "movieverse");
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// === TAMBAH / EDIT ===
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST['id'] ?? '';
    $isi = $_POST['isi'];

    if ($id) {
        $stmt = $conn->prepare("UPDATE notifikasi SET isi = ? WHERE id = ?");
        $stmt->bind_param("si", $isi, $id);
        $stmt->execute();
    } else {
        $stmt = $conn->prepare("INSERT INTO notifikasi (isi) VALUES (?)");
        $stmt->bind_param("s", $isi);
        $stmt->execute();
    }
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}

// === HAPUS ===
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $conn->query("DELETE FROM notifikasi WHERE id = $id");
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}

// === AMBIL DATA ===
$notif = $conn->query("SELECT * FROM notifikasi ORDER BY id DESC");

// === MODE EDIT ===
$editData = null;
if (isset($_GET['edit'])) {
    $id = $_GET['edit'];
    $res = $conn->query("SELECT * FROM notifikasi WHERE id = $id");
    $editData = $res->fetch_assoc();
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>CRUD Notifikasi</title>
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

        textarea {
            width: 100%;
            padding: 6px;
            margin: 5px 0;
        }
    </style>
</head>

<body>
    <h2><?= $editData ? "Edit Notifikasi" : "Tambah Notifikasi" ?></h2>

    <form method="post">
        <input type="hidden" name="id" value="<?= $editData['id'] ?? '' ?>">

        <label for="isi">Isi Notifikasi:</label>
        <textarea name="isi" rows="4" required><?= $editData['isi'] ?? '' ?></textarea>

        <button type="submit"><?= $editData ? "Update" : "Tambah" ?></button>
        <?php if ($editData): ?>
            <a href="<?= $_SERVER['PHP_SELF'] ?>">Batal</a>
        <?php endif; ?>
    </form>

    <h2>Daftar Notifikasi</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Isi</th>
                <th>Tanggal</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($row = $notif->fetch_assoc()): ?>
                <tr>
                    <td><?= $row['id'] ?></td>
                    <td><?= htmlspecialchars($row['isi']) ?></td>
                    <td><?= $row['tanggal'] ?></td>
                    <td>
                        <a href="?edit=<?= $row['id'] ?>">✏️ Edit</a> |
                        <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Yakin ingin hapus notifikasi ini?')">🗑️ Hapus</a>
                    </td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</body>

</html>