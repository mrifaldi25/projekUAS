<?php
$conn = new mysqli("localhost", "root", "", "movieverse");
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// === TAMBAH / EDIT ===
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'] ?? '';
    $name = $_POST['name'];
    $email = $_POST['email'];
    $role = $_POST['role'];
    $password = $_POST['password'] ?? '';

    if ($id) {
        $stmt = $conn->prepare("UPDATE users SET name=?, email=?, role=? WHERE id=?");
        $stmt->bind_param("sssi", $name, $email, $role, $id);
        $stmt->execute();
    } else {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())");
        $stmt->bind_param("ssss", $name, $email, $hashedPassword, $role);
        $stmt->execute();
    }
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}

// === HAPUS ===
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $conn->query("DELETE FROM users WHERE id = $id");
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}

// === AMBIL SEMUA USER ===
$users = $conn->query("SELECT * FROM users");

// === MODE EDIT ===
$editUser = null;
if (isset($_GET['edit'])) {
    $id = $_GET['edit'];
    $result = $conn->query("SELECT * FROM users WHERE id = $id");
    $editUser = $result->fetch_assoc();
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>CRUD User MovieVerse</title>
    <style>
        body {
            font-family: sans-serif;
            padding: 20px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 8px 12px;
            text-align: left;
        }

        input,
        select {
            padding: 6px;
            margin: 5px 0;
            width: 100%;
        }

        form {
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <h2><?= $editUser ? "Edit User" : "Tambah User Baru" ?></h2>

    <form method="post">
        <input type="hidden" name="id" value="<?= $editUser['id'] ?? '' ?>">

        <div class="form-group">
            <label>Nama:</label>
            <input type="text" name="name" value="<?= $editUser['name'] ?? '' ?>" required>
        </div>

        <div class="form-group">
            <label>Email:</label>
            <input type="email" name="email" value="<?= $editUser['email'] ?? '' ?>" required>
        </div>

        <?php if (!$editUser): ?>
            <div class="form-group">
                <label>Password:</label>
                <input type="password" name="password" required>
            </div>
        <?php endif; ?>

        <div class="form-group">
            <label>Role:</label>
            <select name="role" required>
                <option value="">-- Pilih Role --</option>
                <option value="admin" <?= isset($editUser) && $editUser['role'] === 'admin' ? 'selected' : '' ?>>Admin</option>
                <option value="user" <?= isset($editUser) && $editUser['role'] === 'user' ? 'selected' : '' ?>>User</option>
            </select>
        </div>

        <button type="submit"><?= $editUser ? "Update" : "Tambah" ?></button>
        <?php if ($editUser): ?>
            <a href="<?= $_SERVER['PHP_SELF'] ?>">Batal</a>
        <?php endif; ?>
    </form>

    <h2>Daftar User</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Dibuat</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($row = $users->fetch_assoc()): ?>
                <tr>
                    <td><?= $row['id'] ?></td>
                    <td><?= htmlspecialchars($row['name']) ?></td>
                    <td><?= htmlspecialchars($row['email']) ?></td>
                    <td><?= $row['role'] ?></td>
                    <td><?= $row['created_at'] ?></td>
                    <td>
                        <a href="?edit=<?= $row['id'] ?>">✏️ Edit</a> |
                        <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Yakin ingin menghapus?')">🗑️ Hapus</a>
                    </td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</body>

</html>